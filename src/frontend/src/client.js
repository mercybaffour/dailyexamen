import fetch from 'unfetch';

 const checkStatus = response => {
     if (response.ok) {
         return response;
     }
     // convert non-2xx HTTP responses into errors:
     const error = new Error(response.statusText);
     error.response = response;
     return Promise.reject(error);
 }

 export const getAllExamens = () =>
     fetch("api/v1/examens")
         .then(checkStatus);

 export const addNewExamen = examen =>
     fetch("api/v1/examens", {
             headers: {
                 'Content-Type': 'application/json'
             },
             method: 'POST',
             body: JSON.stringify(examen)
         }
     ).then(checkStatus)

 export const deleteExamen = examenId =>
     fetch(`api/v1/examens/${examenId}`, {
         method: 'DELETE'
     }).then(checkStatus);