import React, { useEffect, useState } from "react";
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Header from "./subcomponents/header";
import Footer from "./subcomponents/footer";
import { useNavigate } from 'react-router-dom';
import backgroundImage from './image/Home.jpg';

export default function Report() {
    const [reportData, setReportData] = useState({
        totalEmployees: 0,
        activeEmployees: 0,
        onLeaveEmployees: 0,
        systemDeptCount: 0,
        financialDeptCount: 0,
        vetDeptCount: 0
    });

    useEffect(() => {
        axios.get('/api/employeeReportData')
            .then(response => {
                setReportData(response.data);
            })
            .catch(error => console.error('There was an error fetching the report data:', error));
    }, []);

    const createPdf = () => {
        const doc = new jsPDF();
        doc.text('Employee Report', 20, 20);
        doc.autoTable({
            startY: 30,
            head: [['#', 'Description', 'Value']],
            body: [
                ['1', 'Total employee count', reportData.totalEmployees],
                ['2', 'Active employee count', reportData.activeEmployees],
                ['3', 'On leave employee count', reportData.onLeaveEmployees],
                ['4', 'System Management', reportData.systemDeptCount],
                ['5', 'Financial Management', reportData.financialDeptCount],
                ['6', 'Veterinarian', reportData.vetDeptCount],
            ],
        });
        doc.save('employee_report.pdf');
    };
    
    const navigate = useNavigate();

    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        margin: 0,
        padding: 0,
        color: 'white',
    };

    return (
        <div style={backgroundStyle}>
            <Header />
          
            <h1 className="container text-center">Employee Report</h1>

            <table className="table table-striped table-hover container">
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Total employee count</td>
                        <td>{reportData.totalEmployees}</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Active employee count</td>
                        <td>{reportData.activeEmployees}</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>On leave employee count</td>
                        <td>{reportData.onLeaveEmployees}</td>
                    </tr>
                    <tr>
                        <th scope="row">4</th>
                        <td>System Management employees</td>
                        <td>{reportData.systemDeptCount}</td>
                    </tr>
                    <tr>
                        <th scope="row">5</th>
                        <td>Financial Management employees</td>
                        <td>{reportData.financialDeptCount}</td>
                    </tr>
                    <tr>
                        <th scope="row">6</th>
                        <td>Veterinarian employees</td>
                        <td>{reportData.vetDeptCount}</td>
                    </tr>
                </tbody>
            </table>
            <button type="button" className="btn btn-primary container" onClick={createPdf}>
                Create PDF of Report
            </button>
            <br/>
            <button type="button" className="btn btn-primary" onClick={() => navigate('/')} style={{ marginTop: '20px', marginLeft: '45%' }}>
              View Employees
            </button>
          
        </div>
    );
}
