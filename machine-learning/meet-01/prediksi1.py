import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# 1️⃣ Buat Data Simulasi Mahasiswa
np.random.seed(42)

jumlah_mahasiswa = 100

ipk = np.round(np.random.uniform(2.0, 4.0, jumlah_mahasiswa), 2)  # IPK antara 2.0 - 4.0
sks = np.random.randint(100, 150, jumlah_mahasiswa)  # SKS antara 100 - 150
kehadiran = np.random.randint(50, 100, jumlah_mahasiswa)  # Kehadiran (%) antara 50 - 100
tidak_lulus = np.random.randint(0, 10, jumlah_mahasiswa)  # Jumlah mata kuliah tidak lulus (0 - 10)

# Label Kelulusan (1 = Lulus, 0 = Tidak Lulus)
kelulusan = np.where((ipk >= 2.75) & (sks >= 130) & (kehadiran >= 75) & (tidak_lulus <= 3), 1, 0)

# Simpan dalam Pandas DataFrame
df = pd.DataFrame({
    'IPK': ipk,
    'SKS': sks,
    'Kehadiran': kehadiran,
    'Tidak Lulus': tidak_lulus,
    'Lulus': kelulusan
})

# 2️⃣ Tampilkan Data
print(df.head())

# 3️⃣ Visualisasi Data
plt.figure(figsize=(10, 6))
sns.heatmap(df.corr(), annot=True, cmap="coolwarm", fmt=".2f")
plt.title("Korelasi Antara Variabel Akademik")
plt.show()

sns.pairplot(df, hue="Lulus", diag_kind="kde")
plt.show()

# 4️⃣ Pisahkan Data untuk Training & Testing
X = df[['IPK', 'SKS', 'Kehadiran', 'Tidak Lulus']]  # Fitur
y = df['Lulus']  # Target
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 5️⃣ Buat Model Machine Learning (Logistic Regression)
model = LogisticRegression()
model.fit(X_train, y_train)

# 6️⃣ Prediksi Data Testing
y_pred = model.predict(X_test)

# 7️⃣ Evaluasi Model
accuracy = accuracy_score(y_test, y_pred)
print(f"🎯 Akurasi Model: {accuracy:.2f}")

print("\n📊 Classification Report:")
print(classification_report(y_test, y_pred))

print("\n📌 Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))

# 8️⃣ Prediksi Kelulusan Mahasiswa Baru
mahasiswa_baru = np.array([[3.2, 140, 85, 2]])  # IPK=3.2, SKS=140, Kehadiran=85%, Tidak Lulus=2
prediksi = model.predict(mahasiswa_baru)
hasil = "Lulus" if prediksi[0] == 1 else "Tidak Lulus"
print(f"\n🔍 Prediksi Kelulusan Mahasiswa Baru: {hasil}")
