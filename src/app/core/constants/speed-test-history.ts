import { Sort } from '@core/interfaces/common/sort';
import { SpeedTestHistorySort } from '@core/interfaces/speed-test/speed-test-history-sort';

export const SPEED_TEST_HISTORY: Sort[] = [
  { label: 'Newest', value: SpeedTestHistorySort.CREATED_AT_DESC },
  { label: 'Oldest', value: SpeedTestHistorySort.CREATED_AT_ASC },
  { label: 'Fastest', value: SpeedTestHistorySort.CPM_DESC },
  { label: 'Slowest', value: SpeedTestHistorySort.CPM_ASC },
  { label: 'Best accuracy', value: SpeedTestHistorySort.ACCURACY_DESC },
  { label: 'Worst accuracy', value: SpeedTestHistorySort.ACCURACY_ASC },
];
