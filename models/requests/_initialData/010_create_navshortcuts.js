module.exports = function (session) {
  var desktopID, folderID, conn = session.connection;

  // In the ubm_desktop table look for the desktop with the code CityReq_desktop
  desktopID = conn.lookup('ubm_desktop', 'ID', {
    expression: 'code',
    condition: 'equal',
    values: { code: 'CityReq_desktop' }
  });

  console.info('\tFill `Common dictionary` desktop');
  if (!desktopID) { //If not found, create a new
    console.info('\t\tcreate new `City request` desktop');
    desktopID = conn.insert({
    entity: 'ubm_desktop',
    fieldList: [ 'ID' ],
    execParams: {
        code: 'CityReq_desktop',
        caption: 'City Requests'
    }
    });
  }
  else { //else display a message
    console.info('\t\tuse existed desktop with code `CityReq_desktop`', desktopID);
  }
  folderID =  conn.lookup('ubm_navshortcut', 'ID', {expression: 'code', condition: 'equal', values: {code: 'req_departments_folder'}});
    if (!folderID) {
        console.log('\t\tcreate `Departments` folder');
            folderID = conn.insert({
            entity: 'ubm_navshortcut',
            fieldList: ['ID'],
            execParams: {
                desktopID:  desktopID,
                code:       'req_departments_folder',
                caption:    'Departments',
                isFolder:   true,
                isCollapsed:false,
                displayOrder: 10
             }
        });
    }
    else {
        console.info('\t\tuse existed folder with code `req_departments_folder`', folderID);
        }
  lastID =  conn.lookup('ubm_navshortcut', 'ID', {expression: 'code', condition: 'equal', values: {code: 'req_depart'}});
    if(!lastID) {
        console.log('\t\t\tcreate `Department` shortcut');
            lastID = conn.insert({
            fieldList: ['ID'],
            entity: 'ubm_navshortcut',
            execParams: {
                desktopID:  desktopID,
                parentID:   folderID,
                code:       'req_depart',
                caption:    'Departments',
                iconCls:    'fa fa-building-o',
                displayOrder: 10,
                cmdCode : JSON.stringify({cmdType: 'showList', cmdData: {params:[{ entity: 'req_depart', method: 'select', fieldList: '*'}]}}, null, '\t')
            }
        });
        }
        else {
            console.info('\t\tuse existed shortcut with code `req_depart`', lastID);
            }

   lastID = conn.lookup('ubm_navshortcut', 'ID', {expression: 'code', condition: 'equal', values: {code: 'req_subDepart'}});
     if (!lastID) {
        console.log('\t\t\tcreate `SubDepartments` shortcut');
        lastID = conn.insert({ 
           fieldList: ['ID'],
           entity: 'ubm_navshortcut',
           execParams: {
               desktopID: desktopID,
               parentID: folderID,
               code: 'req_subDepart',
               caption: 'SubDepartments',
               iconCls: 'fa fa-user-circle-o',
               displayOrder: 20,
               cmdCode: JSON.stringify({cmdType: 'showList', cmdData: {params: [{entity: 'req_subDepart', method: 'select', fieldList: '*'}]}}, null, '\t')
          }
       });
     } 
     else {
         console.info('\t\tuse existed shortcut with code `req_subDepart`', lastID);
     }

    lastID = conn.lookup('ubm_navshortcut', 'ID', {expression: 'code', condition: 'equal', values: {code: 'req_reqList'}});
     if (!lastID) {
        console.log('\t\t\tcreate `Request List` shortcut');
        lastID = conn.insert({ 
           fieldList: ['ID'],
           entity: 'ubm_navshortcut',
           execParams: {
               desktopID: desktopID,
               parentID: folderID,
               code: 'req_reqList',
               caption: 'Request List',
               iconCls: 'fa fa-user-circle-o',
               displayOrder: 20,
               cmdCode: JSON.stringify({cmdType: 'showList', cmdData: {params: [{entity: 'req_reqList', method: 'select', fieldList: '*'}]}}, null, '\t')
          }
       });
     } 
     else {
         console.info('\t\tuse existed shortcut with code `req_reqList`', lastID);
     }
}