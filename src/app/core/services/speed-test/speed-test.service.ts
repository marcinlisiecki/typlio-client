import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpeedTestMode } from '@core/interfaces/speed-test/speed-test-mode';
import { environment } from '@app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpeedTestService {
  constructor(private http: HttpClient) {}

  getAvailableSpeedTestModes(): Observable<SpeedTestMode[]> {
    return this.http.get<SpeedTestMode[]>(environment.apiUrl + '/speed-tests/modes');
  }
}
