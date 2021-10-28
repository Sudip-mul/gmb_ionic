import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  headerDict = {
    'Content-Type': 'application/json',
  }
  headersnew = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  };
  requestOptionsnew = {
    headers: new HttpHeaders(this.headersnew),
  };

  constructor( private http: HttpClient) { }

  getuserinfo(userid: any) {
    let formData  = new HttpParams({
      fromObject: {
        "userid": userid
      }
    });
    // console.log(formData)
   return this.http.post<any>(environment.docrankurl + "userinfo.php", (formData), this.requestOptionsnew).pipe(map(res => {
      return res
    }));
}


geteverything(userid: any) {
  let formData  = new HttpParams({
    fromObject: {
      "userid": userid
    }
  });
  // console.log(formData)
 return this.http.post<any>(environment.apiurl + "doctordata.php", (formData), this.requestOptionsnew).pipe(map(res => {
    return res
  }));
}


  getreviews(function_name: any, email: any, loc: any) {
    let formData  =  {
        "function": function_name,
        "email": email,
        "loc": loc
      }
  
   return this.http.post<any>(environment.apiurl + "api.php", (formData), this.requestOptions).pipe(map(res => {
    //  console.log(res)
      return res
    }));
}

getposts(function_name: any, email: any, loc: any) {
  let formData  =  {
      "function": function_name,
      "email": email,
      "loc": loc
    }

 return this.http.post<any>(environment.apiurl + "api.php", (formData), this.requestOptions).pipe(map(res => {
  //  console.log(res)
    return res
  }));
}





getchips(reviews: any) {
  let formData  =  {
      "reviews": reviews
    }

 return this.http.post<any>("https://gmbgsearch.multipliersolutions.in/getchips", (formData), this.requestOptions).pipe(map(res => {
  //  console.log(res)
    return res
  }));
}
doclog(userid: any) {
  let formData  = new HttpParams({
    fromObject: {
      "userid": userid
    }
  });
    console.log(formData);
 return this.http.post<any>(environment.apiurl + "doctorlogs.php", (formData), this.requestOptionsnew).pipe(map(res => {
  //  console.log(res)
    return res
  }));
}


}
