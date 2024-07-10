import axios from 'axios'

export async function GetReview(review: string){
    const data = await axios.post("http://3.23.98.1:8000/api/review/",{review})
    if(data.status == 200){
        return data.data
    }

    return false
}