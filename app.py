from flask import Flask, request, jsonify, flash, url_for, render_template,send_from_directory
# from decouple import config
from flask_cors import CORS
from flask_bcrypt import Bcrypt,generate_password_hash
import json
import os
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail, Message
from email_validator import validate_email, EmailNotValidError
from flask_migrate import Migrate
from datetime import datetime, timedelta
import re
import random
import string
import secrets
from PIL import Image
import fitz
import io
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager

app = Flask(__name__)


secret_key = secrets.token_hex(16)
app.config['SECRET_KEY'] = secret_key
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config[' SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER']='static/images'

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
mail = Mail(app)

app.app_context().push()
migrate = Migrate(app, db)
jwt = JWTManager(app)
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
CORS(app, origins = ["http://localhost:3000"])

# Configure Flask-Mail

app.config['MAIL_SERVER'] = 'smtp.elasticemail.com'  # Use your SMTP server details
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
# app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'alumnidei8@gmail.com'
app.config['MAIL_PASSWORD'] = '2526F938048D1D335640A4031E66C3B5B4AC'

# Create the database tables
db.create_all()

# validation
def _repr_(self):
        return f"User('{self.username}')"
   
def is_valid_email(email):
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(pattern, email)

def is_valid_password(password):
    return len(password) >= 8 and any(c.isalnum() for c in password) and any(not c.isalnum() for c in password)

def validate_registration_data(data):
    required_fields = ['username', 'email', 'password', 'confirmPassword', 'university']
    for field in required_fields:
        if field not in data or not data[field]:
            return False
    return True

    
class User(db.Model):
   id = db.Column(db.Integer, primary_key=True)
   username = db.Column(db.String(80), nullable=False)
   password = db.Column(db.String(128), nullable=False) 
   email = db.Column(db.String(128), unique=True, nullable=False)
   university = db.Column(db.String(128), nullable=False)
   description=db.Column(db.Text,default="No description provided")
   occupation=db.Column(db.String(128),default="Unknown occupation")
   image=db.Column(db.String(255),default="default_profile_image.jpg")
   verification_code = db.Column(db.String(6))
   code_creation_time = db.Column(db.DateTime)
   posts = db.relationship('Post', backref='author', lazy=True)

   def __repr__(self):
        return f"User('{self.username}')"

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    image=db.Column(db.String(255))
    date_posted = db.Column(db.DateTime,  default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False)

ALLOWED_EXTENSIONS = {'pdf', 'jpg', 'jpeg', 'png'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

   
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
  
    
    print("Received data:", data)  
   

    university = data.get('university')
    username = data.get('username')
    password = data.get('password')
    email = data.get('email') 
    confirmPassword = data.get('confirmPassword')
      

    
    if not is_valid_email(email):
        return jsonify({'error': 'Invalid email format, @gmail.com is necessary'}), 400
    
    if password != confirmPassword:
        return jsonify({'error': 'Passwords do not match'}), 400
    
    if not is_valid_password(password):
        return jsonify({'error': 'Invalid password format, minimum length is 8 and one special charater!' }), 400
    if not username or not password or not email or not university or not confirmPassword: 

        return jsonify({'error': 'All the fields are required'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'email already exists'}), 400
    verification_code = ''.join(random.choices(string.digits, k=6))

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    user = User(username=username, email=email, password=hashed_password,  university=university, verification_code=verification_code )
    user.verification_code = verification_code
    db.session.add(user)
    db.session.commit()
    
    
    msg = Message("Email verification code", sender="alumnidei8@gmail.com", recipients=[user.email])
    msg.body = f"Your verification code is: {verification_code}"
    mail.send(msg)

    return jsonify({"message": "Verification code sent"}), 200


@app.route('/verify_email', methods=['POST'])

def verify_email():
    data = request.json
    email = data.get('email')
    code = data.get('code')

    user = User.query.filter_by(email=email).first()

    # print the data
    print("Email:", email)
    print("Code:", code)
    print("User:", user)

  
    if user and code == user.verification_code:
       return jsonify({'message': 'Verify email successfully'}), 200
    else:
        # return jsonify({'message': 'Invalid credentials'}), 400
        User.query.filter_by(email=email).delete()
        db.session.commit()
        return jsonify({'message': 'Email does not exist'}), 400

@app.route('/login', methods=['POST'])

def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')


    user = User.query.filter_by(email=email).first()

    
    print("Email:", email)
    print("  password:",   password)
   
    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=email)
        print(access_token)
        response = {"message": "Login Successful", "access_token": access_token}
        return jsonify(response), 200
     
        
    else:
     
        return jsonify({'message': 'Invalid credentials'}), 401
    
@app.route('/send_verification_email', methods=['POST'])
def send_reset_email():
    data = request.get_json()
    print("Received data:", data)
    email = data.get('email')
    user = User.query.filter_by(email=email).first()

    if user:
        verification_code = ''.join(random.choices(string.digits, k=6))
        user.code_creation_time = datetime.utcnow()
        user.verification_code = verification_code
        db.session.add(user)
        db.session.commit()

        msg = Message("Reset Your Password", sender="alumnidei8@gmail.com", recipients=[user.email])
        msg.body = f"The code will expire in 2 minute.\n Your verification code is: {verification_code}"
        mail.send(msg)

        return jsonify({"message": "Verification code sent"}), 200
    else:
        return jsonify({"message": "Email not found"}), 404

    

@app.route('/verify_code', methods=['POST'])

def verify_code():
    data = request.json
    email = data.get('email')
    code = data.get('code')

    user = User.query.filter_by(email=email).first()

    # print the data
    print("Email:", email)
    print("Code:", code)
    print("User:", user)

  
    if user and code == user.verification_code:
        current_time = datetime.utcnow()
        if (current_time - user.code_creation_time).total_seconds() <= 120:
            # Code is valid
            return jsonify({'message': 'Code verified successfully'}), 200
        else:
            return jsonify({'message': 'Code has expired'}), 404
    else:
        return jsonify({'message': 'Invalid credentials'}), 400
      

@app.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    
     # print the data
    print("Email:", email)
    print("Password:",   password)
    print("User:", user)
    if not is_valid_password(password):
        return jsonify({'error': 'Invalid password format.' }), 400
    if user:
           hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
           user.password=hashed_password
    
           db.session.commit()
           
           return jsonify({'message': 'reset password'}), 200
        
   

    
    else:
        return jsonify({'error': 'not change'}), 404  


@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.json
    print("Received data:", data)  
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')
    message = data.get('message')

    msg = Message(
        'New Contact Form Submission',
        sender='alumnidei8@gmail.com',
        recipients=['priyanshisinghal234@gmail.com']
    )
    msg.body = f'Name: {name}\nEmail: {email}\nPhone: {phone}\nMessage: {message}'  

    try:
        mail.send(msg)
        return jsonify({'message': 'Email sent successfully'}), 200
    except Exception as e:
        print(str(e))
        return jsonify({'error': 'Failed to send email'}), 500 
    


@app.route('/create_post', methods=['POST','GET'])
@jwt_required()
def create():
    if request.method=='POST':
        current_user = get_jwt_identity()
        data = request.form
        print("Received data:", data)
        content = data.get('content')
        image=request.files.get('image')
       
        if content and image:
          
          
             if image.filename.endswith('.pdf'):
                pdf_filename = os.path.join(app.config['UPLOAD_FOLDER'], image.filename)
                image.save(pdf_filename)

              
                pdf_document = fitz.open(pdf_filename)
                images = []
                for page_num in range(pdf_document.page_count):
                    page = pdf_document.load_page(page_num)
                    image_bytes = page.get_pixmap().tobytes()
                    image = Image.open(io.BytesIO(image_bytes))
                    image_filename = f"page_{page_num}.png"
                    image.save(os.path.join(app.config['UPLOAD_FOLDER'], image_filename))
                    images.append(image_filename)

               
                post = Post(content=content, image=','.join(images), user_id=current_user)
                db.session.add(post)
                db.session.commit()
                
                return jsonify({'message': 'Post created with PDF images'}), 200
             else:
                image_filename=os.path.join(app.config['UPLOAD_FOLDER'],image.filename)
                image.save(image_filename)
                post=Post(content=content,image=image.filename,user_id=current_user)
                db.session.add(post)
                db.session.commit()
                return jsonify({'message':'post created '}),200
        else:
            return jsonify({'message':'content required'}),201
  

    elif request.method=='GET':
        current_user = get_jwt_identity()
        page = request.args.get('page', default=1, type=int)
        posts_per_page = request.args.get('posts_per_page', default=10, type=int)

      
        total_posts = Post.query.count()
        total_pages = (total_posts + posts_per_page - 1) 
        offset = (page - 1) * posts_per_page

        posts = Post.query.order_by(Post.date_posted.desc()).all()
        post_list = []
        for post in posts:
            user=User.query.filter_by(email=post.user_id).first()
            post_data = { 
                'id': post.id,
                'content': post.content,
                'image':post.image,
                'username':user.username,
                'userimage':user.image,
                'email':user.email
            }
            post_list.append(post_data)
        
        return jsonify({'posts': post_list}), 200
    

@app.route('/userprofile', methods=['POST', 'GET'])
@jwt_required()
def send_username():
    global emailitem 

    

    if request.method == 'POST':
        data = request.get_json()
        email = data.get('email')
        emailitem = email  
        print(f'Received email: {email}')

       
        return jsonify({'message': 'Email received'}), 200

    elif request.method == 'GET':
        user = User.query.filter_by(email=emailitem).first()
        print(user)
        user_post=Post.query.filter_by(user_id=user.email).all()
        post = [{'id': post.id, 'content': post.content,'image':post.image} for post in user_post]
        return jsonify({'username': user.username,'occupation':user.occupation, 'description':user.description, 'email':user.email,'image':user.image,'posts':post}), 200





@app.route('/delete_post/<int:post_id>', methods=['DELETE'])
@jwt_required()
def delete_post(post_id):
    user_id = get_jwt_identity()
    post = Post.query.filter_by(id=post_id, user_id=user_id).first()
    
    if post:
        db.session.delete(post)
        db.session.commit()
        return jsonify({'message': 'Post deleted successfully'}), 200
    else:
        return jsonify({'message': 'Post not found or not authorized'}), 404


@app.route('/user_post',methods=['GET'])
@jwt_required()
def user_post():
    user_id = get_jwt_identity()
    user_posts = Post.query.filter_by(user_id=user_id).all()
    posts = [{'id': post.id, 'content': post.content,'image':post.image} for post in user_posts]
    return jsonify(posts)



@app.route('/account', methods=['GET'])
@jwt_required()
def account():
    current_user=get_jwt_identity()
    user=User.query.filter_by(email=current_user).first()
    
    user_data = {
            'username': user.username,
            'occupation':user.occupation,
            'description':user.description,
            'image':user.image,
            'email':user.email
        }
    
    return jsonify({'user': user_data}), 200



@app.route('/update_profile',methods=['POST'])
@jwt_required()
def update_profile():
    user_id=get_jwt_identity()
    data=request.form 
    username=data.get('username')
    description=data.get('description')
    occupation=data.get('occupation')
    image=request.files.get('image')
    print(image)
    print(data)
    if not username:
        user=User.query.filter_by(email=user_id).first()
        username=user.username

    if image:
         image_filename=os.path.join(app.config['UPLOAD_FOLDER'],image.filename)
         image.save(image_filename)
   
    user = User.query.filter_by(email=user_id).first()
    print(user)
    if user is None:
     return jsonify({'message': 'User not found'}), 404
    user.username=username 
    user.occupation=occupation
    user.description=description
    user.image=image.filename
    db.session.commit()
    return jsonify({'message':'profile updated successfully'}),200

 



@app.route('/static/images/<filename>',methods=['GET'])

def uploaded_image(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'],filename)     





@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response



if __name__ == '__main__':
      
        app.run(debug=True)

