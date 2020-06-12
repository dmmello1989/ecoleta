import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename(req, file, callback) {
      const hash = crypto.randomBytes(6).toString('hex');
      const fileName = `${hash}-${file.originalname}`;

      // callback() recebe como primeiro argumento um erro, como é quase impossível acontecer um 
      // erro nas variáveis acima, passamos um null. Em seguida é o nome do arquivo.
      callback(null, fileName);
    }
  })
}