export interface SchemaItem {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  logo: string;
  contactPoint: {
    '@type': string;
    telephone: string;
    contactType: string;
  };
  sameAs: string;
}
