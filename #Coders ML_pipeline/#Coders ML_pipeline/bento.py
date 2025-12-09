import numpy as np
import bentoml

# load latest saved model by name
model = bentoml.xgboost.load_model("my_xgb_sklearn:6drwrlwu4oyoyasc")   # use the name you saved

# single input: feature vector must match training order & length
features = [0.1, 1.2, 3.4, 5.6]   # example: replace with your real features
X = np.array(features, dtype=float).reshape(1, -1)

# predictions
pred = model.predict(X)            # class or value
probs = None
if hasattr(model, "predict_proba"):
    probs = model.predict_proba(X)

print("pred:", pred.tolist())
print("probs:", probs.tolist() if probs is not None else None)

batch = [[0.1,1.2,3.4,5.6], [0.2,1.0,3.1,5.2]]
X = np.array(batch, dtype=float)
print(model.predict(X))
