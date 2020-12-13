//                                   ,,,                         MM .M
//                               ,!MMMMMMM!,                     MM MM  ,.
//       ., .M                .MMMMMMMMMMMMMMMM.,          'MM.  MM MM .M'
//     . M: M;  M          .MMMMMMMMMMMMMMMMMMMMMM,          'MM,:M M'!M'
//    ;M MM M: .M        .MMMMMMMMMMMMMMMMMMMMMMMMMM,         'MM'...'M
//     M;MM;M :MM      .MMMMMMMMMMMMMMMMMMMMMMMMMMMMMM.       .MMMMMMMM
//     'M;M'M MM      MMMMMM  MMMMMMMMMMMMMMMMM  MMMMMM.    ,,M.M.'MMM'
//      MM'MMMM      MMMMMM @@ MMMMMMMMMMMMMMM @@ MMMMMMM.'M''MMMM;MM'
//     MM., ,MM     MMMMMMMM  MMMMMMMMMMMMMMMMM  MMMMMMMMM      '.MMM
//     'MM;MMMMMMMM.MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM.      'MMM
//      ''.'MMM'  .MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM       MMMM
//       MMC      MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM.      'MMMM
//      .MM      :MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM''MMM       MMMMM
//      MMM      :M  'MMMMMMMMMMMMM.MMMMM.MMMMMMMMMM'.MM  MM:M.    'MMMMM
//     .MMM   ...:M: :M.'MMMMMMMMMMMMMMMMMMMMMMMMM'.M''   MM:MMMMMMMMMMMM'
//    AMMM..MMMMM:M.    :M.'MMMMMMMMMMMMMMMMMMMM'.MM'     MM''''''''''''
//    MMMMMMMMMMM:MM     'M'.M'MMMMMMMMMMMMMM'.MC'M'     .MM
//     '''''''''':MM.       'MM!M.'M-M-M-M'M.'MM'        MMM
//                MMM.            'MMMM!MMMM'            .MM
//                 MMM.             '''   ''            .MM'
//                  MMM.                               MMM'
//                   MMMM            ,.J.JJJJ.       .MMM'
//                    MMMM.       'JJJJJJJ'JJJM   CMMMMM
//                      MMMMM.    'JJJJJJJJ'JJJ .MMMMM'
//                        MMMMMMMM.'  'JJJJJ'JJMMMMM'
//                          'MMMMMMMMM'JJJJJ JJJJJ'
//                             ''MMMMMMJJJJJJJJJJ'
//                                     'JJJJJJJJ'		

const server = require('./src/app.js');
const { conn } = require('./src/db.js'); 

// Sincronizadno todos los modelos a la vez.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); 
  });
});