import { AddDaysPipe } from './add-days.pipe';

describe('AddDaysPipe', () => {
  it('create an instance', () => {
    const pipe = new AddDaysPipe();
    expect(pipe).toBeTruthy();
  });
});
