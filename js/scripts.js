const newGrade = document.querySelector('#note')
const student = document.querySelector('#student')
const newAssignment = document.querySelector('#materia')
const writeDiv = document.getElementById('div-values')
const studentsBook = {
    nombre: [],
    notas: []
}

function addStudent(){
        const studentName = student.value.trim(); 
        const studentExists = studentsBook['nombre'].includes(studentName); 

        if (studentExists) {
            writeDiv.innerHTML = ''
            writeDiv.innerHTML = `El alumno ya posee un historial iniciado.` 
            console.log('El alumno ya posee un historial iniciado.');
        } else if(student.value.length < 3){
            writeDiv.innerHTML = ''
            writeDiv.innerHTML = `El nombre del alumno es requerido.` 
            console.log('El nombre del alumno es requerido.');
        }else {
            studentsBook['nombre'].push(studentName); 
            writeDiv.innerHTML = ''
        writeDiv.innerHTML = `Alumno ${studentName} agregado correctamente.` 
            console.log(`Alumno ${studentName} agregado correctamente.`);
        }
}

function addGrade() {
        const studentName = student.value.trim(); 
        const assignmentName = newAssignment.value.trim();  
        const gradeValue = newGrade.value.trim();  

        if (!studentName || !assignmentName || !gradeValue) {
            writeDiv.innerHTML = 'Complete los campos requeridos.';
            console.log('Complete los campos requeridos.');
            return; 
        }

        const studentIndex = studentsBook['nombre'].indexOf(studentName);
        
        // if (studentIndex === -1) {
        //     writeDiv.innerHTML = 'El alumno no existe en el libro.';
        //     console.log('El alumno no existe en el libro.');
        //     return; 
        // }

        const assignmentIndex = studentsBook['notas'][studentIndex]?.find(item => item['materia'] === assignmentName);
        if (assignmentIndex !== undefined) {
            console.log(assignmentIndex);
            writeDiv.innerHTML = `El alumno ya posee una nota asignada a la materia ${assignmentName}.`;
            console.log(`El alumno ya posee una nota asignada a la materia ${assignmentName}.`);
            return;
        }

        if (!studentsBook['notas'][studentIndex]) {
            studentsBook['notas'][studentIndex] = []; 
        }

        studentsBook['notas'][studentIndex].push({ materia: assignmentName, nota: gradeValue });
        writeDiv.innerHTML = `Nota asignada correctamente.`;
        console.log(studentsBook);
    
}

function showStudents() {
    console.log(studentsBook);
    writeDiv.innerHTML = '';
    
    if (studentsBook['nombre'].length > 0) {
        studentsBook['nombre'].forEach((studentName, studentIndex) => {
            writeDiv.innerHTML += `Alumno: ${studentName}.`;
            
            const studentNotes = studentsBook['notas'][studentIndex];
            if (studentNotes && studentNotes.length > 0) {
                studentNotes.forEach(assignment => {
                    writeDiv.innerHTML += ` Materia ${assignment['materia']} Nota: ${assignment['nota']}.<br>`;
                });
            } else {
                writeDiv.innerHTML += ` No hay notas asignadas.<br>`;
            }
        });
    } else {
        writeDiv.innerHTML = `No existen alumnos en la base de datos.`;
    }
}

document.querySelector('#add').addEventListener('click', addStudent)
document.querySelector('#addNote').addEventListener('click', addGrade)
document.querySelector('#show').addEventListener('click', showStudents)