export interface Job {
  OffertaLavoroID?: number;
  Titolo: string;
  DescrizioneBreve: string;
  Azienda: string;
  Provincia: string;
  DataInserimento: string;
  SmartWorking: boolean;
  RetribuzioneLorda: number;
  TipologiaContratto: string;
}
