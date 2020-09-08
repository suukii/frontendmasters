var deepJS = defineWorkshop();

var toBeAdded = [
    { id: 313, name: 'Frank', paid: true },
    { id: 410, name: 'Suzy', paid: true },
    { id: 709, name: 'Brian', paid: false },
    { id: 105, name: 'Henry', paid: false },
    { id: 502, name: 'Mary', paid: true },
    { id: 664, name: 'Bob', paid: false },
    { id: 250, name: 'Peter', paid: true },
    { id: 375, name: 'Sarah', paid: true },
    { id: 867, name: 'Greg', paid: false },
];
var toBeEnrolled = [410, 105, 664, 375];

toBeAdded.forEach(deepJS.addStudent);
toBeEnrolled.forEach(deepJS.enrollStudent);

deepJS.printCurrentEnrollment();
console.log('----');
deepJS.enrollPaidStudents();
console.log('----');
deepJS.remindUnpaidStudents();

/*
	Bob (664): Not Paid
	Henry (105): Not Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Frank (313): Paid
	Henry (105): Not Paid
	Mary (502): Paid
	Peter (250): Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Henry (105): Not Paid
*/

// *******************************

function defineWorkshop() {
    var currentEnrollment = [];
    var studentRecords = [];
    var publicAPI = {
        addStudent,
        enrollStudent,
        printCurrentEnrollment,
        enrollPaidStudents,
        remindUnpaidStudents,
    };

    return publicAPI;

    // *********************************

    function addStudent({ id, name, paid }) {
        studentRecords.push({ id, name, paid });
    }

    function enrollStudent(id) {
        currentEnrollment.push(id);
    }

    function printCurrentEnrollment() {
        printRecords(currentEnrollment);
    }
    function enrollPaidStudents() {
        currentEnrollment = paidStudentsToEnroll();
    }
    function remindUnpaidStudents() {
        remindUnpaid(currentEnrollment);
    }

    // ********************************

    function getStudentFromId(studentId) {
        return studentRecords.find(matchId);

        // *************************

        function matchId(record) {
            return record.id == studentId;
        }
    }

    function printRecords(recordIds) {
        var records = recordIds.map(getStudentFromId);

        records.sort(sortByNameAsc);

        records.forEach(printRecord);
    }

    function sortByNameAsc(record1, record2) {
        if (record1.name < record2.name) return -1;
        else if (record1.name > record2.name) return 1;
        else return 0;
    }

    function printRecord(record) {
        console.log(
            `${record.name} (${record.id}): ${
                record.paid ? 'Paid' : 'Not Paid'
            }`,
        );
    }

    function paidStudentsToEnroll() {
        var recordsToEnroll = studentRecords.filter(needToEnroll);

        var idsToEnroll = recordsToEnroll.map(getStudentId);

        return [...currentEnrollment, ...idsToEnroll];
    }

    function needToEnroll(record) {
        return record.paid && !currentEnrollment.includes(record.id);
    }

    function getStudentId(record) {
        return record.id;
    }

    function remindUnpaid(recordIds) {
        var unpaidIds = recordIds.filter(notYetPaid);

        printRecords(unpaidIds);
    }

    function notYetPaid(studentId) {
        var record = getStudentFromId(studentId);
        return !record.paid;
    }
}
