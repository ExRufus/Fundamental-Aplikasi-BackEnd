const fs = require('fs');

class StrotageService {
  constructor(folder) {
    this._folder = folder; // Ketahuilah bahwa properti this._folder akan kita gunakan sebagai basis folder dalam penyimpanan berkas yang akan ditulis.

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true }); // Options recursive: true membuat mkdirSync bekerja secara rekursif
    }
  }

  // Fungsi writeFile kita buat mengembalikan Promise sehingga proses penulisan berkas akan berjalan secara asynchronous. 
  writeFile(file, meta) {
    const filename = +new Date() + meta.filename; // Di JavaScript kita bisa mendapatkan nilai timestamp dengan menggunakan expression +new Date().
    const path = `${this._folder}/${filename}`; // Variabel path dibuat untuk menampung path atau alamat lengkap dari berkas yang akan dituliskan. Nilainya diambil dari basis folder yang digunakan (this._folder) dan nama berkas (filename).

    const fileStream = fs.createWriteStream(path); // Terakhir, setelah kita memiliki nilai path, kita dapat membuat writable stream dari path tersebut menggunakan fungsi fs.createWriteStream.

    return new Promise((resolve, reject) => {
      fileStream.on('error', (error) => reject(error));
      file.pipe(fileStream);
      file.on('end', () => resolve(filename));
    });
  }
}

module.exports = StrotageService;