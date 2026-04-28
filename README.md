## Author 
Mehak Garg - 2210990572
Research Paper
# RAPZIS - Road Accident Prone Zone Identification System
RAPZIS is a full stack web application that helps in predicting accident risk, analyzing accident data and providing safety insights ysing modern web technologies.
The goal of this project is to reduce accident risks by combining real-world data with intelligent prediction models.

## Key Features
1. Accident Risk Prediction
2. Accident Report Submission
3. Detailed Report Summary
4. Visualition of Accident on Map
5. Dashboard with Graphs and Analytics

## Tech Stack
### Frontend
1. React.js
2. CSS
3. Chart Libraries (Recharts/Chart.js)
### Backend
1. Node.js
2. Express.js
### Database
1. MongoDB (Mongoose)
### Machine Learning
1. Python (Jupyter Notebook)
2. Scikit-learn
3. Flask API

## Project Architecture
React Frontend -> Node.js Backend (Express API) -> MongoDB Database -> Flask ML API (Prediction)

## Folder Structure
RAPZIS/
|
|-backend/
| |-config/
| | |-> db.js
| |-models/
| | |-> Report.js
| | |-> User.js
| |-routes/
| | |-> authRoutes.js
| | |-> predict.js
| | |-> reportRoutes.js
| | |-> stats.js
| |-server.js
|
|-frontend/
| |-src/
| | |-components/
| | | |-> AccidentReport.js
| | | |-> Auth.js
| | | |-> Home.js
| | | |-> Login.js
| | | |-> MapSection.js
|
|-machine-learning
| |->app.py
| |-> model.pkl
| |-> road_accident.csv

## Installation & Setup
1. Backend Setup - Runs on http://localhost:5000
   cd backend
   npm install
   npm start
2. Frontend Setup - Runs on http://localhost:3000
   cd frontend
   npm install
   npm start
3. ML Model Setup (Flask)
   cd machine-learning
   pip install -r requirements.txt
   python app.py

## Machine Learning Model
- Trained using accident dataset
- Combination of Clustering + Classification (Hybrid Approach)
### Algorithms Used
1. Supervised Learning
   - Logistic Regression
   - Random Forest
2. Unsupervised Learning
   - K-Means Clustering
   - DBSCAN (Density-Based Clustering)

## Model Performance
Accuracy ~ 80%

## Future Enhancements
- Accident HeatMap
- Export Report as PDF
- Mobile Optimization
- Real-time Alerts
- Advanced Analytics Dashboard
- Self-learning ML Models
  
