import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpeedTestMode } from '@core/interfaces/typing/speed-test/speed-test-mode';
import { environment } from '@app/environments/environment';
import { SpeedTest } from '@core/interfaces/typing/speed-test/speed-test';
import { NewSpeedTest } from '@core/interfaces/typing/speed-test/new-speed-test';
import { AuthService } from '@core/services/auth/auth.service';
import { PagedResponse } from '@core/interfaces/common/paged-response';

@Injectable({
  providedIn: 'root',
})
export class SpeedTestService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  getAvailableSpeedTestModes(): Observable<SpeedTestMode[]> {
    return this.http.get<SpeedTestMode[]>(environment.apiUrl + '/speed-tests/modes');
  }

  saveSpeedTest(newSpeedTest: NewSpeedTest): Observable<SpeedTest> {
    const userId = this.authService.getId();
    return this.http.post<SpeedTest>(
      environment.apiUrl + `/users/${userId}/speed-tests`,
      newSpeedTest,
    );
  }

  getAllUserSpeedTest(
    userId: number,
    page: number,
    size: number,
    sortBy: string,
    modes?: SpeedTestMode[],
  ): Observable<PagedResponse<SpeedTest>> {
    let params: any = { page, sortBy, size };
    if (modes) {
      params = { page, sortBy, modes, size };
    }

    return this.http.get<PagedResponse<SpeedTest>>(
      environment.apiUrl + `/users/${userId}/speed-tests`,
      { params },
    );
  }

  getSpeedTest(userId: number, speedTestId: number): Observable<SpeedTest> {
    return this.http.get<SpeedTest>(
      environment.apiUrl + `/users/${userId}/speed-tests/${speedTestId}`,
    );
  }
}
