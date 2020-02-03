var sql = require('mssql');



async function insertPersonalInfo(firstName, lastName, idNumber, gender, adress, city, zipCode, country, phoneNumber, mailAdress) {
    return new Promise((resolve, reject) => {
        var request = new sql.Request();
        request.input('FirstName', sql.VarChar, firstName);
        request.input('LastName', sql.VarChar, lastName);
        request.input('IdentifacitonNumber', sql.Char, idNumber);
        request.input('Gender', sql.VarChar, gender);
        request.input('Adress', sql.VarChar, adress);
        request.input('City', sql.VarChar, city);
        request.input('ZipCode', sql.Char, zipCode);
        request.input('Country', sql.VarChar, country);
        request.input('PhoneNumber', sql.Char, phoneNumber);
        request.input('MailAdress', sql.VarChar, mailAdress);


        request.query("insert into PersonalInfo output inserted.PersonalInfoID values(@FirstName,@LastName,@IdentifacitonNumber,@Gender,@Adress,@City,@ZipCode,@Country,@PhoneNumber,@MailAdress)", (err, result) => {
            if (err != null) console.log(err);
            resolve(result);
        });
    });
}




module.exports = {
    insertPersonalInfo
}