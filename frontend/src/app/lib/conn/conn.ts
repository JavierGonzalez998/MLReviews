import axios from 'axios'

export async function GetReview(review: string){
    const data = await axios.post("http://localhost:8000/api/review/",{review})
    if(data.status == 200){
        return data.data
    }

    return false
}