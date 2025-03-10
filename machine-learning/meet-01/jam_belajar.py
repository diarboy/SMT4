import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error

# 1️⃣ Buat Data Simulasi
np.random.seed(42)  # Agar hasil tetap konsisten
jam_belajar = np.random.randint(1, 10, 50)  # Jam belajar (1-10 jam)
skor = jam_belajar * 10 + np.random.randint(-5, 5, 50)  # Skor berdasarkan jam belajar + noise

# 2️⃣ Simpan Data dalam Pandas DataFrame
df = pd.DataFrame({'Jam Belajar': jam_belajar, 'Skor': skor})

# 3️⃣ Visualisasi Data
plt.figure(figsize=(8, 5))
sns.scatterplot(x=df['Jam Belajar'], y=df['Skor'], color='blue')
plt.title("Hubungan Jam Belajar dan Skor Ujian")
plt.xlabel("Jam Belajar")
plt.ylabel("Skor Ujian")
plt.show()

# 4️⃣ Split Data untuk Training dan Testing
X = df[['Jam Belajar']]  # Variabel independen
y = df['Skor']  # Variabel dependen
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 5️⃣ Buat Model Prediksi dengan Scikit-Learn
model = LinearRegression()
model.fit(X_train, y_train)

# 6️⃣ Prediksi dan Evaluasi Model
y_pred = model.predict(X_test)

# 7️⃣ Visualisasi Hasil Prediksi
plt.figure(figsize=(8, 5))
sns.scatterplot(x=X_test['Jam Belajar'], y=y_test, color='blue', label="Data Asli")
sns.lineplot(x=X_test['Jam Belajar'], y=y_pred, color='red', label="Prediksi")
plt.title("Prediksi Skor Ujian Berdasarkan Jam Belajar")
plt.xlabel("Jam Belajar")
plt.ylabel("Skor Ujian")
plt.legend()
plt.show()

# 8️⃣ Evaluasi Model
mae = mean_absolute_error(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)
print(f"Mean Absolute Error (MAE): {mae:.2f}")
print(f"Mean Squared Error (MSE): {mse:.2f}")

# 9️⃣ Prediksi Skor untuk Siswa Baru
jam_baru = np.array([[8]])  # Misal siswa belajar 8 jam
prediksi_skor = model.predict(jam_baru)
print(f"Prediksi skor untuk siswa yang belajar 8 jam: {prediksi_skor[0]:.2f}")
