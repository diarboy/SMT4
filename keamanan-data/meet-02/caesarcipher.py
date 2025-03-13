def caesar_cipher(text, shift):
    result = ""
    for char in text:
        if char.isalpha():
            shift_base = ord('A') if char.isupper() else ord('a')
            result += chr((ord(char) - shift_base + shift) % 26 + shift_base)
        else:
            result += char
    return result

# Enkripsi dengan pergeseran 5
plaintext = "PRODI INFORMATIKA MAHARDIKA"
shift = 5
ciphertext = caesar_cipher(plaintext, shift)
print("Ciphertext:", ciphertext)

# Dekripsi dengan pergeseran -5
decrypted_text = caesar_cipher(ciphertext, -shift)
print("Decrypted Text:", decrypted_text)
