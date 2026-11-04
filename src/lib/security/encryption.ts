import crypto from 'node:crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;
const TAG_LENGTH = 16;

function getSecretKey(): Buffer {
  const secret = process.env.ENCRYPTION_SECRET || 'qatu_default_secure_secret_key_32_bytes!';
  return crypto.createHash('sha256').update(secret).digest();
}

/**
 * Cifra una cadena sensible (ej. contraseña de Gmail) usando AES-256-GCM.
 */
export function encryptData(text: string): string {
  if (!text) return '';
  try {
    const key = getSecretKey();
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const tag = cipher.getAuthTag();
    
    // Formato: iv:tag:encrypted
    return `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted}`;
  } catch (error) {
    console.error('Error al cifrar datos:', error);
    return text;
  }
}

/**
 * Descifra una cadena previamente cifrada con encryptData.
 */
export function decryptData(cipherText: string): string {
  if (!cipherText) return '';
  if (!cipherText.includes(':')) {
    // Si no tiene el formato de hash (ej. texto plano de testing), devolver directamente
    return cipherText;
  }
  
  try {
    const [ivHex, tagHex, encryptedHex] = cipherText.split(':');
    if (!ivHex || !tagHex || !encryptedHex) return cipherText;

    const key = getSecretKey();
    const iv = Buffer.from(ivHex, 'hex');
    const tag = Buffer.from(tagHex, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(tag);
    
    let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    console.error('Error al descifrar datos:', error);
    return '••••••••';
  }
}
