import { Sort } from '@core/interfaces/common/sort';
import { SpeedTestHistorySort } from '@core/interfaces/typing/speed-test/speed-test-history-sort';

export const SPEED_TEST_HISTORY: Sort[] = [
  { label: 'common.filter.newest', value: SpeedTestHistorySort.CREATED_AT_DESC },
  { label: 'common.filter.oldest', value: SpeedTestHistorySort.CREATED_AT_ASC },
  { label: 'common.filter.fastest', value: SpeedTestHistorySort.CPM_DESC },
  { label: 'common.filter.slowest', value: SpeedTestHistorySort.CPM_ASC },
  { label: 'common.filter.bestAccuracy', value: SpeedTestHistorySort.ACCURACY_DESC },
  { label: 'common.filter.worstAccuracy', value: SpeedTestHistorySort.ACCURACY_ASC },
];
