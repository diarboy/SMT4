def vigenere_cipher(text, key, encrypt=True):
    result = []
    key = key.upper()
    key_length = len(key)
    
    for i, char in enumerate(text):
        if char.isalpha():
            shift = ord(key[i % key_length]) - ord('A')
            if not encrypt:
                shift = -shift
            shift_base = ord('A') if char.isupper() else ord('a')
            result.append(chr((ord(char) - shift_base + shift) % 26 + shift_base))
        else:
            result.append(char)
    
    return "".join(result)

# Enkripsi dengan kunci "KEY"
plaintext = "CONFIDENTIAL DATA"
key = "KEY"
ciphertext = vigenere_cipher(plaintext, key, encrypt=True)
print("Ciphertext:", ciphertext)

# Dekripsi dengan kunci "KEY"
decrypted_text = vigenere_cipher(ciphertext, key, encrypt=False)
print("Decrypted Text:", decrypted_text)
