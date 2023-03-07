import { setError } from "../redux/error_slice"
import store from "../redux/store"

export default function handleFetchError (data) {
    if (data.status !==200) {
        console.log(data)
        store.dispatch(setError({open:true, message: typeof data.message == 'string' ? data.message : "", state:'error'}))
    }
}