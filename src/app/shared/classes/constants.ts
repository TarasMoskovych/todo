export class Constants {

  public static readonly VALIDATION_PATTERN = new RegExp(['^([a-z0-9,().\'"?!-]+\\s)*', '[a-z0-9,().\'"?!-]+$'].join(''),'i');

  public static readonly PAGE_SIZE_OPTIONS = [5, 10, 50, 100];

  public static readonly WITHOUT_PRIORITY = 'empty';

}
