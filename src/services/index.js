import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const calculateGrade = async (gradeData) => {
    const body = {
        grade: gradeData
    }
    const result = await axios.post('/calculateGrade', body)

    return result
}
