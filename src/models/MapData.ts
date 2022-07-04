export interface Incident {
    incident_key: string;
    occur_date: string;
    occur_time: string;
    boro: Boro;
    loc_of_occur_desc: LOCOfOccurDesc;
    precinct: string;
    jurisdiction_code: string;
    loc_classfctn_desc: LOCClassfctnDesc;
    location_desc: string;
    statistical_murder_flag: StatisticalMurderFlag;
    perp_age_group: AgeGroup;
    perp_sex: Sex;
    perp_race: Race;
    vic_age_group: AgeGroup;
    vic_sex: Sex;
    vic_race: Race;
    x_coord_cd: string;
    y_coord_cd: string;
    latitude: string;
    longitude: string;
    geocoded_column: GeocodedColumn;
}

export enum Boro {
    Bronx = 'BRONX',
    Brooklyn = 'BROOKLYN',
    Manhattan = 'MANHATTAN',
    Queens = 'QUEENS',
    StatenIsland = 'STATEN ISLAND'
}

export interface GeocodedColumn {
    type: Type;
    coordinates: number[];
}

export enum Type {
    Point = 'Point'
}

export enum LOCClassfctnDesc {
    Commercial = 'COMMERCIAL',
    Dwelling = 'DWELLING',
    Housing = 'HOUSING',
    Other = 'OTHER',
    Playground = 'PLAYGROUND',
    Street = 'STREET',
    Transit = 'TRANSIT',
    Vehicle = 'VEHICLE'
}

export enum LOCOfOccurDesc {
    Inside = 'INSIDE',
    Outside = 'OUTSIDE'
}

export enum AgeGroup {
    Null = '(null)',
    The18 = '<18',
    The1824 = '18-24',
    The2544 = '25-44',
    The4564 = '45-64',
    The65 = '65+'
}

export enum Race {
    AsianPacificIslander = 'ASIAN / PACIFIC ISLANDER',
    Black = 'BLACK',
    BlackHispanic = 'BLACK HISPANIC',
    Null = '(null)',
    Unknown = 'UNKNOWN',
    White = 'WHITE',
    WhiteHispanic = 'WHITE HISPANIC'
}

export enum Sex {
    F = 'F',
    M = 'M',
    Null = '(null)',
    U = 'U'
}

export enum StatisticalMurderFlag {
    Y = 'Y',
    N = 'N'
}
