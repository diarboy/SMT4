import pandas as pd
import numpy as np
import re
import matplotlib.pyplot as plt
import seaborn as sns
import nltk
from wordcloud import WordCloud
import html
import os

# **1️⃣ Pastikan file ada sebelum dibaca**
file_path = r"C:\Users\ardib\OneDrive\Documents\SMT4\machine-learning\meet-03\dc-komentar-pertamina.xlsx"

if not os.path.exists(file_path):
    raise FileNotFoundError(f"File tidak ditemukan: {file_path}")

# **2️⃣ Membaca dataset**
df = pd.read_excel(file_path)

# **3️⃣ Cek apakah kolom 'Komentar' ada sebelum lanjut**
if 'Komentar' not in df.columns:
    raise KeyError("Kolom 'Komentar' tidak ditemukan dalam dataset!")

# **4️⃣ Bersihkan karakter HTML & whitespace**
df['Komentar'] = df['Komentar'].astype(str).str.strip()  # Hilangkan spasi di awal & akhir
df['Komentar'] = df['Komentar'].apply(lambda x: html.unescape(x))  # Konversi karakter HTML

# **5️⃣ Tangani nilai yang hilang**
df = df.dropna(subset=['Komentar'])  # Hapus jika 'Komentar' kosong
# df['Komentar'].fillna('Tidak ada data', inplace=True)  # Bisa dipakai jika ingin mengganti nilai kosong

# **6️⃣ Hapus duplikasi (jika diperlukan)**
df = df.drop_duplicates(subset=['Komentar'])

# **7️⃣ Menampilkan beberapa baris pertama dan terakhir dataset**
print(df.head(10))  # Lihat 10 data pertama
print(df.tail(10))  # Lihat 10 data terakhir
print("Total data setelah dibersihkan:", df.shape[0])

# **8️⃣ Menampilkan informasi dataset**
df.info()
print("\nDeskripsi statistik dataset:")
print(df.describe())

# **9️⃣ Menampilkan jumlah kemunculan setiap nilai unik di kolom 'Komentar'**
print("\nTop 10 kata yang sering muncul:")
print(df['Komentar'].value_counts().head(10))

# **🔟 Mengecek nilai yang hilang dalam dataset**
print("\nJumlah nilai kosong per kolom:")
print(df.isnull().sum())

# **Tambahan: Menampilkan daftar semua kolom**
print("\nDaftar kolom dalam dataset:")
print(df.columns)

df['comment_length'] = df['Komentar'].apply(lambda x: len(str(x)))

plt.figure(figsize=(10,5))
sns.histplot(df['comment_length'], bins=30, kde=True)
plt.xlabel("Panjang Komentar")
plt.ylabel("Frekuensi")
plt.title("Distribusi Panjang Komentar")
plt.show()

# Melihat Kata-Kata Paling Sering Muncul (Word Cloud)
all_text = " ".join(comment for comment in df['Komentar'])
wordcloud = WordCloud(width=800, height=400, background_color="white").generate(all_text)
plt.figure(figsize=(10,5))
plt.imshow(wordcloud, interpolation="bilinear")
plt.axis("off")
plt.title("Word Cloud - Kata yang Paling Sering Muncul dalam Komentar")
plt.show()
