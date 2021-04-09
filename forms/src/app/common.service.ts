import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private _http:HttpClient) { }

  createuser(user:object){
    return this._http.post("http://localhost:3000/users",user);
  }
  
  updateuser(user: { firstname?: string; lastname?: string; username?: string; mobile?: string; email?: string; city?: string; state?: string; country?: string; id?: any; }){
    return this._http.put("http://localhost:3000/users/"+user.id,user)

  }

  getuser(){
    return this._http.get("http://localhost:3000/users")
  }

  deleteuser(user: { id: string; }){
    return this._http.delete("http://localhost:3000/users/"+user.id)
  }
}
