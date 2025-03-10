import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.linear_model import LinearRegression

# Membuat data dummy dengan NumPy
x = np.array([1, 2, 3, 4, 5]).reshape(-1, 1)
y = np.array([2, 4, 5, 4, 5])

# Membungkus data dengan Pandas
df = pd.DataFrame({'x': x.flatten(), 'y': y})

# Visualisasi dengan Seaborn
sns.scatterplot(x='x', y='y', data=df)
plt.show()

# Model machine learning dengan Scikit-Learn
model = LinearRegression()
model.fit(x, y)
print("Koefisien regresi:", model.coef_)
