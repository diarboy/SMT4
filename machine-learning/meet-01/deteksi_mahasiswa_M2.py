import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# 1. Meningkatkan Kualitas Dataset
np.random.seed(42)
data = {
    'IPK': np.random.uniform(2.0, 4.0, 500),  # Menambah jumlah data menjadi 500
    'SKS_Tempuh': np.random.randint(90, 150, 500),
    'Kehadiran': np.random.uniform(60, 100, 500),
    'MK_Tidak_Lulus': np.random.randint(0, 6, 500),
    'Tugas_Selesai': np.random.randint(50, 100, 500),  # Fitur baru
    'Nilai_Ujian_Rata2': np.random.uniform(50, 100, 500)  # Fitur baru
}
df = pd.DataFrame(data)

# 2. Deteksi Dini Risiko Akademik
def deteksi_risiko(df):
    kondisi_risiko = (
        (df['IPK'] < 2.75) | (df['MK_Tidak_Lulus'] > 3) | 
        (df['Kehadiran'] < 75) | (df['Tugas_Selesai'] < 70) | (df['Nilai_Ujian_Rata2'] < 60)
    )
    df['Risiko_Akademik'] = np.where(kondisi_risiko, 1, 0)
    return df

df = deteksi_risiko(df)

# 3. Menambahkan Kolom Status Kelulusan (Label untuk Prediksi)
df['Lulus'] = np.where(
    (df['IPK'] >= 2.75) & (df['SKS_Tempuh'] >= 130) & (df['MK_Tidak_Lulus'] <= 2) &
    (df['Tugas_Selesai'] >= 70) & (df['Nilai_Ujian_Rata2'] >= 60), 1, 0
)

# 4. Visualisasi Data
plt.figure(figsize=(6, 4))
sns.countplot(x='Lulus', hue='Lulus', data=df, palette='coolwarm', legend=False)
plt.title('Distribusi Kelulusan Mahasiswa')
plt.xlabel('Lulus (1) / Tidak Lulus (0)')
plt.ylabel('Jumlah Mahasiswa')
plt.show()

# 5. Model Prediksi Kelulusan
X = df[['IPK', 'SKS_Tempuh', 'Kehadiran', 'MK_Tidak_Lulus', 'Tugas_Selesai', 'Nilai_Ujian_Rata2']]
y = df['Lulus']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LogisticRegression()
model.fit(X_train, y_train)

y_pred = model.predict(X_test)

# 6. Evaluasi Model
accuracy = accuracy_score(y_test, y_pred)
print(f'Akurasi Model: {accuracy:.2f}')
print('Classification Report:\n', classification_report(y_test, y_pred))
print('Confusion Matrix:\n', confusion_matrix(y_test, y_pred))
