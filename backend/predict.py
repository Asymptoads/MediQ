import sys
import json
import pandas as pd
import joblib  # Import joblib directly

# Load the model
model = joblib.load('./operationTimeModel.pkl')

# Read input data from stdin
input_data = json.loads(sys.stdin.read())

# Convert input data to DataFrame
input_df = pd.DataFrame([input_data])

# Make prediction
prediction = model.predict(input_df)

# Output the prediction
print(json.dumps({'predicted_operation_time': prediction[0]}))