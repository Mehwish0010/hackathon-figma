// generateReport.js

const fs = require('fs');
const { Parser } = require('json2csv');

// Sample test case data
const testCases = [
  {
    TestCaseID: "TC001",
    Description: "Verify login functionality",
    Steps: "1. Navigate to login page; 2. Enter valid credentials; 3. Click Login",
    ExpectedResult: "User is logged in and redirected to dashboard",
    ActualResult: "User was logged in successfully",
    Status: "Passed",
    Comments: "No issues",
  },
  {
    TestCaseID: "TC002",
    Description: "Check invalid password",
    Steps: "1. Navigate to login page; 2. Enter valid username; 3. Enter invalid password; 4. Click Login",
    ExpectedResult: "An error message is displayed",
    ActualResult: "Error message displayed as expected",
    Status: "Passed",
    Comments: "",
  },
  {
    TestCaseID: "TC003",
    Description: "Verify empty fields validation",
    Steps: "1. Navigate to login page; 2. Click Login without entering any data",
    ExpectedResult: "All fields show required error messages",
    ActualResult: "Some errors missing",
    Status: "Failed",
    Comments: "Investigate error messaging",
  },
];

try {
  // Define the fields for CSV and create a Parser instance
  const fields = ['TestCaseID', 'Description', 'Steps', 'ExpectedResult', 'ActualResult', 'Status', 'Comments'];
  const json2csvParser = new Parser({ fields });
  const csv = json2csvParser.parse(testCases);

  // Write the CSV to a file
  fs.writeFileSync('TestCaseReport.csv', csv);
  console.log('TestCaseReport.csv has been saved.');
} catch (err) {
  console.error('Error generating CSV:', err);
}

