/* eslint-disable */
declare namespace Components {
    export interface HeaderParameters {
        GridpointForecastFeatureFlags?: Parameters.GridpointForecastFeatureFlags;
    }
    namespace Parameters {
        export type AlertArea = /* State/territory codes and marine area codes */ Schemas.AreaCode[];
        export type AlertCertainty = Schemas.AlertCertainty[];
        export type AlertCode = string /* ^\w{3}$ */[];
        export type AlertEventName = string /* ^[A-Za-z0-9 ]+$ */[];
        export type AlertMessageType = ("alert" | "update" | "cancel")[];
        export type AlertPoint = Schemas.PointString /* ^(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)$ */;
        export type AlertRegion = /**
         * Marine region code. These are groups of marine areas combined.
         * * AL: Alaska waters (PK)
         * * AT: Atlantic Ocean (AM, AN)
         * * GL: Great Lakes (LC, LE, LH, LM, LO, LS, SL)
         * * GM: Gulf of Mexico (GM)
         * * PA: Eastern Pacific Ocean and U.S. West Coast (PZ)
         * * PI: Central and Western Pacific (PH, PM, PS)
         *
         */
        Schemas.MarineRegionCode[];
        export type AlertRegionType = "land" | "marine";
        export type AlertSeverity = Schemas.AlertSeverity[];
        export type AlertStatus = ("actual" | "exercise" | "system" | "test" | "draft")[];
        export type AlertUrgency = Schemas.AlertUrgency[];
        export type AlertZone = /**
         * UGC identifier for a NWS forecast zone or county.
         * The first two letters will correspond to either a state code or marine area code (see #/components/schemas/StateTerritoryCode and #/components/schemas/MarineAreaCode for lists of valid letter combinations).
         * The third letter will be Z for public/fire zone or C for county.
         *
         */
        Schemas.NWSZoneID /* ^(A[KLMNRSZ]|C[AOT]|D[CE]|FL|G[AMU]|I[ADLN]|K[SY]|L[ACEHMOS]|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AHKMRSZ]|S[CDL]|T[NX]|UT|V[AIT]|W[AIVY]|[HR]I)[CZ]\d{3}$ */[];
        export type GridpointForecastFeatureFlags = ("forecast_temperature_qv" | "forecast_wind_speed_qv")[];
        export type GridpointForecastUnits = /* Denotes the units used in the textual portions of the forecast. */ Schemas.GridpointForecastUnits;
        export type GridpointWFO = /* Three-letter identifier for a NWS office. */ Schemas.NWSForecastOfficeId;
        export type GridpointX = number;
        export type GridpointY = number;
        export type Limit = number;
        export type NWSForecastOfficeId = /* Three-letter identifier for a NWS office. */ Schemas.NWSForecastOfficeId;
        export type NWSZoneId = /**
         * UGC identifier for a NWS forecast zone or county.
         * The first two letters will correspond to either a state code or marine area code (see #/components/schemas/StateTerritoryCode and #/components/schemas/MarineAreaCode for lists of valid letter combinations).
         * The third letter will be Z for public/fire zone or C for county.
         *
         */
        Schemas.NWSZoneID /* ^(A[KLMNRSZ]|C[AOT]|D[CE]|FL|G[AMU]|I[ADLN]|K[SY]|L[ACEHMOS]|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AHKMRSZ]|S[CDL]|T[NX]|UT|V[AIT]|W[AIVY]|[HR]I)[CZ]\d{3}$ */;
        export type ObservationStationId = string;
        export type PaginationCursor = string;
        export type PathPoint = Schemas.PointString /* ^(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)$ */;
        export type QueryEndTime = string; // date-time
        export type QueryStartTime = string; // date-time
    }
    export interface PathParameters {
        GridpointWFO?: Parameters.GridpointWFO;
        GridpointX?: Parameters.GridpointX;
        GridpointY?: Parameters.GridpointY;
        NWSForecastOfficeId?: Parameters.NWSForecastOfficeId;
        NWSZoneId?: Parameters.NWSZoneId;
        ObservationStationId?: Parameters.ObservationStationId;
        PathPoint?: Parameters.PathPoint;
    }
    export interface QueryParameters {
        AlertArea?: Parameters.AlertArea;
        AlertCertainty?: Parameters.AlertCertainty;
        AlertCode?: Parameters.AlertCode;
        AlertEventName?: Parameters.AlertEventName;
        AlertMessageType?: Parameters.AlertMessageType;
        AlertPoint?: Parameters.AlertPoint;
        AlertRegion?: Parameters.AlertRegion;
        AlertRegionType?: Parameters.AlertRegionType;
        AlertSeverity?: Parameters.AlertSeverity;
        AlertStatus?: Parameters.AlertStatus;
        AlertUrgency?: Parameters.AlertUrgency;
        AlertZone?: Parameters.AlertZone;
        GridpointForecastUnits?: Parameters.GridpointForecastUnits;
        Limit?: Parameters.Limit;
        PaginationCursor?: Parameters.PaginationCursor;
        QueryStartTime?: Parameters.QueryStartTime /* date-time */;
        QueryEndTime?: Parameters.QueryEndTime /* date-time */;
    }
    namespace Responses {
        export type AlertCollection = /* A GeoJSON feature collection. Please refer to IETF RFC 7946 for information on the GeoJSON format. */ Schemas.AlertCollectionGeoJson;
        export type Error = /* Detail about an error. This document conforms to RFC 7807 (Problem Details for HTTP APIs). */ Schemas.ProblemDetail;
        export type GridpointForecast = /* A GeoJSON feature. Please refer to IETF RFC 7946 for information on the GeoJSON format. */ Schemas.GridpointForecastGeoJson;
        export type Observation = /* A GeoJSON feature. Please refer to IETF RFC 7946 for information on the GeoJSON format. */ Schemas.ObservationGeoJson;
        export type ObservationCollection = /* A GeoJSON feature collection. Please refer to IETF RFC 7946 for information on the GeoJSON format. */ Schemas.ObservationCollectionGeoJson;
        export type ObservationStationCollection = /* A GeoJSON feature collection. Please refer to IETF RFC 7946 for information on the GeoJSON format. */ Schemas.ObservationStationCollectionGeoJson;
    }
    namespace Schemas {
        /**
         * An object representing a public alert message.
         * Unless otherwise noted, the fields in this object correspond to the National Weather Service CAP v1.2 specification, which extends the OASIS Common Alerting Protocol (CAP) v1.2 specification and USA Integrated Public Alert and Warning System (IPAWS) Profile v1.0. Refer to this documentation for more complete information.
         * http://docs.oasis-open.org/emergency/cap/v1.2/CAP-v1.2-os.html http://docs.oasis-open.org/emergency/cap/v1.2/ipaws-profile/v1.0/cs01/cap-v1.2-ipaws-profile-cs01.html https://alerts.weather.gov/#technical-notes-v12
         *
         */
        export interface Alert {
            id?: /* The identifier of the alert message. */ AlertId;
            /**
             * A textual description of the area affected by the alert.
             */
            areaDesc?: string;
            /**
             * Lists of codes for NWS public zones and counties affected by the alert.
             */
            geocode?: {
                /**
                 * A list of NWS public zone or county identifiers.
                 */
                UGC?: /**
                 * UGC identifier for a NWS forecast zone or county.
                 * The first two letters will correspond to either a state code or marine area code (see #/components/schemas/StateTerritoryCode and #/components/schemas/MarineAreaCode for lists of valid letter combinations).
                 * The third letter will be Z for public/fire zone or C for county.
                 *
                 */
                NWSZoneID /* ^(A[KLMNRSZ]|C[AOT]|D[CE]|FL|G[AMU]|I[ADLN]|K[SY]|L[ACEHMOS]|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AHKMRSZ]|S[CDL]|T[NX]|UT|V[AIT]|W[AIVY]|[HR]I)[CZ]\d{3}$ */[];
                /**
                 * A list of SAME (Specific Area Message Encoding) codes for affected counties.
                 */
                SAME?: string /* ^\d{6}$ */[];
            };
            /**
             * An array of API links for zones affected by the alert. This is an API-specific extension field and is not part of the CAP specification.
             *
             */
            affectedZones?: string /* uri */[];
            /**
             * A list of prior alerts that this alert updates or replaces.
             */
            references?: {
                /**
                 * An API link to the prior alert.
                 */
                "@id"?: string; // uri
                identifier?: /* The identifier of the alert message. */ AlertId;
                /**
                 * The sender of the prior alert.
                 */
                sender?: string;
                /**
                 * The time the prior alert was sent.
                 */
                sent?: string; // date-time
            }[];
            /**
             * The time of the origination of the alert message.
             */
            sent?: string; // date-time
            /**
             * The effective time of the information of the alert message.
             */
            effective?: string; // date-time
            /**
             * The expected time of the beginning of the subject event of the alert message.
             */
            onset?: string | null; // date-time
            /**
             * The expiry time of the information of the alert message.
             */
            expires?: string; // date-time
            /**
             * The expected end time of the subject event of the alert message.
             */
            ends?: string | null; // date-time
            status?: AlertStatus;
            messageType?: AlertMessageType;
            /**
             * The code denoting the category of the subject event of the alert message.
             */
            category?: "Met" | "Geo" | "Safety" | "Security" | "Rescue" | "Fire" | "Health" | "Env" | "Transport" | "Infra" | "CBRNE" | "Other";
            severity?: AlertSeverity;
            certainty?: AlertCertainty;
            urgency?: AlertUrgency;
            /**
             * The text denoting the type of the subject event of the alert message.
             */
            event?: string;
            /**
             * Email address of the NWS webmaster.
             */
            sender?: string;
            /**
             * The text naming the originator of the alert message.
             */
            senderName?: string;
            /**
             * The text headline of the alert message.
             */
            headline?: string | null;
            /**
             * The text describing the subject event of the alert message.
             */
            description?: string;
            /**
             * The text describing the recommended action to be taken by recipients of the alert message.
             *
             */
            instruction?: string | null;
            /**
             * The code denoting the type of action recommended for the target audience.
             * This corresponds to responseType in the CAP specification.
             *
             */
            response?: "Shelter" | "Evacuate" | "Prepare" | "Execute" | "Avoid" | "Monitor" | "Assess" | "AllClear" | "None";
            /**
             * System-specific additional parameters associated with the alert message.
             * The keys in this object correspond to parameter definitions in the NWS CAP specification.
             *
             */
            parameters?: {
                [name: string]: any[];
            };
        }
        /**
         * An alert entry in an Atom feed
         */
        export interface AlertAtomEntry {
            id?: string;
            updated?: string;
            published?: string;
            author?: {
                name?: string;
            };
            summary?: string;
            event?: string;
            sent?: string;
            effective?: string;
            expires?: string;
            status?: string;
            msgType?: string;
            category?: string;
            urgency?: string;
            severity?: string;
            certainty?: string;
            areaDesc?: string;
            polygon?: string;
            geocode?: AlertXMLParameter[];
            parameter?: AlertXMLParameter[];
        }
        /**
         * An alert feed in Atom format
         */
        export interface AlertAtomFeed {
            id?: string;
            generator?: string;
            updated?: string;
            author?: {
                name?: string;
            };
            title?: string;
            entry?: /* An alert entry in an Atom feed */ AlertAtomEntry[];
        }
        export interface AlertCap {
        }
        export type AlertCertainty = "Observed" | "Likely" | "Possible" | "Unlikely" | "Unknown";
        export interface AlertCollection {
            /**
             * A title describing the alert collection
             */
            title?: string;
            /**
             * The last time a change occurred to this collection
             */
            updated?: string; // date-time
            /**
             * Links for retrieving more data
             */
            pagination?: {
                /**
                 * A link to the next set of alerts
                 */
                next: string; // uri
            };
        }
        /**
         * A GeoJSON feature collection. Please refer to IETF RFC 7946 for information on the GeoJSON format.
         */
        export interface AlertCollectionGeoJson {
            "@context"?: JsonLdContext;
            type: "FeatureCollection";
            features: /* A GeoJSON feature. Please refer to IETF RFC 7946 for information on the GeoJSON format. */ GeoJsonFeature[];
            /**
             * A title describing the alert collection
             */
            title?: string;
            /**
             * The last time a change occurred to this collection
             */
            updated?: string; // date-time
            /**
             * Links for retrieving more data
             */
            pagination?: {
                /**
                 * A link to the next set of alerts
                 */
                next: string; // uri
            };
        }
        export interface AlertCollectionJsonLd {
            /**
             * A title describing the alert collection
             */
            title?: string;
            /**
             * The last time a change occurred to this collection
             */
            updated?: string; // date-time
            /**
             * Links for retrieving more data
             */
            pagination?: {
                /**
                 * A link to the next set of alerts
                 */
                next: string; // uri
            };
            "@context"?: JsonLdContext;
            "@graph"?: /**
             * An object representing a public alert message.
             * Unless otherwise noted, the fields in this object correspond to the National Weather Service CAP v1.2 specification, which extends the OASIS Common Alerting Protocol (CAP) v1.2 specification and USA Integrated Public Alert and Warning System (IPAWS) Profile v1.0. Refer to this documentation for more complete information.
             * http://docs.oasis-open.org/emergency/cap/v1.2/CAP-v1.2-os.html http://docs.oasis-open.org/emergency/cap/v1.2/ipaws-profile/v1.0/cs01/cap-v1.2-ipaws-profile-cs01.html https://alerts.weather.gov/#technical-notes-v12
             *
             */
            Alert[];
        }
        /**
         * A GeoJSON feature. Please refer to IETF RFC 7946 for information on the GeoJSON format.
         */
        export interface AlertGeoJson {
            "@context"?: JsonLdContext;
            id?: string; // uri
            type: "Feature";
            geometry: /* A GeoJSON geometry object. Please refer to IETF RFC 7946 for information on the GeoJSON format. */ GeoJsonGeometry;
            properties: /**
             * An object representing a public alert message.
             * Unless otherwise noted, the fields in this object correspond to the National Weather Service CAP v1.2 specification, which extends the OASIS Common Alerting Protocol (CAP) v1.2 specification and USA Integrated Public Alert and Warning System (IPAWS) Profile v1.0. Refer to this documentation for more complete information.
             * http://docs.oasis-open.org/emergency/cap/v1.2/CAP-v1.2-os.html http://docs.oasis-open.org/emergency/cap/v1.2/ipaws-profile/v1.0/cs01/cap-v1.2-ipaws-profile-cs01.html https://alerts.weather.gov/#technical-notes-v12
             *
             */
            Alert;
        }
        /**
         * The identifier of the alert message.
         */
        export type AlertId = string;
        export interface AlertJsonLd {
            "@graph"?: /**
             * An object representing a public alert message.
             * Unless otherwise noted, the fields in this object correspond to the National Weather Service CAP v1.2 specification, which extends the OASIS Common Alerting Protocol (CAP) v1.2 specification and USA Integrated Public Alert and Warning System (IPAWS) Profile v1.0. Refer to this documentation for more complete information.
             * http://docs.oasis-open.org/emergency/cap/v1.2/CAP-v1.2-os.html http://docs.oasis-open.org/emergency/cap/v1.2/ipaws-profile/v1.0/cs01/cap-v1.2-ipaws-profile-cs01.html https://alerts.weather.gov/#technical-notes-v12
             *
             */
            Alert[];
        }
        export type AlertMessageType = "Alert" | "Update" | "Cancel" | "Ack" | "Error";
        export type AlertSeverity = "Extreme" | "Severe" | "Moderate" | "Minor" | "Unknown";
        export type AlertStatus = "Actual" | "Exercise" | "System" | "Test" | "Draft";
        export type AlertUrgency = "Immediate" | "Expected" | "Future" | "Past" | "Unknown";
        export interface AlertXMLParameter {
            valueName?: string;
            value?: string;
        }
        /**
         * State/territory codes and marine area codes
         */
        export type AreaCode = /* State/territory codes and marine area codes */ StateTerritoryCode | /**
         * Marine area code as defined in NWS Directive 10-302:
         * * AM: Western North Atlantic Ocean and along U.S. East Coast south of Currituck Beach Light NC following the coastline into Gulf of Mexico to Ocean Reef FL including the Caribbean
         * * AN: Western North Atlantic Ocean and along U.S. East Coast from Canadian border south to Currituck Beach Light NC
         * * GM: Gulf of Mexico and along the U.S. Gulf Coast from the Mexican border to Ocean Reef FL
         * * LC: Lake St. Clair
         * * LE: Lake Erie
         * * LH: Lake Huron
         * * LM: Lake Michigan
         * * LO: Lake Ontario
         * * LS: Lake Superior
         * * PH: Central Pacific Ocean including Hawaiian waters
         * * PK: North Pacific Ocean near Alaska and along Alaska coastline including the Bering Sea and the Gulf of Alaska
         * * PM: Western Pacific Ocean including Mariana Island waters
         * * PS: South Central Pacific Ocean including American Samoa waters
         * * PZ: Eastern North Pacific Ocean and along U.S. West Coast from Canadian border to Mexican border
         * * SL: St. Lawrence River above St. Regis
         *
         */
        MarineAreaCode;
        export type BinaryFile = string; // binary
        /**
         * A GeoJSON bounding box. Please refer to IETF RFC 7946 for information on the GeoJSON format.
         */
        export type GeoJsonBoundingBox = [
            number,
            number,
            number,
            number,
            ...number[]
        ];
        /**
         * A GeoJSON coordinate. Please refer to IETF RFC 7946 for information on the GeoJSON format.
         */
        export type GeoJsonCoordinate = [
            number,
            number,
            ...number[]
        ];
        /**
         * A GeoJSON feature. Please refer to IETF RFC 7946 for information on the GeoJSON format.
         */
        export interface GeoJsonFeature {
            "@context"?: JsonLdContext;
            id?: string; // uri
            type: "Feature";
            geometry: /* A GeoJSON geometry object. Please refer to IETF RFC 7946 for information on the GeoJSON format. */ GeoJsonGeometry;
            properties: {
                [key: string]: any;
            };
        }
        /**
         * A GeoJSON feature collection. Please refer to IETF RFC 7946 for information on the GeoJSON format.
         */
        export interface GeoJsonFeatureCollection {
            "@context"?: JsonLdContext;
            type: "FeatureCollection";
            features: /* A GeoJSON feature. Please refer to IETF RFC 7946 for information on the GeoJSON format. */ GeoJsonFeature[];
        }
        /**
         * A GeoJSON geometry object. Please refer to IETF RFC 7946 for information on the GeoJSON format.
         */
        export type GeoJsonGeometry = /* A GeoJSON geometry object. Please refer to IETF RFC 7946 for information on the GeoJSON format. */ null | null | null | null | null | null;
        /**
         * A GeoJSON line string. Please refer to IETF RFC 7946 for information on the GeoJSON format.
         */
        export type GeoJsonLineString = [
            /* A GeoJSON coordinate. Please refer to IETF RFC 7946 for information on the GeoJSON format. */ GeoJsonCoordinate,
            /* A GeoJSON coordinate. Please refer to IETF RFC 7946 for information on the GeoJSON format. */ GeoJsonCoordinate,
            .../* A GeoJSON coordinate. Please refer to IETF RFC 7946 for information on the GeoJSON format. */ GeoJsonCoordinate[]
        ];
        /**
         * A GeoJSON polygon. Please refer to IETF RFC 7946 for information on the GeoJSON format.
         */
        export type GeoJsonPolygon = [
            /* A GeoJSON coordinate. Please refer to IETF RFC 7946 for information on the GeoJSON format. */ GeoJsonCoordinate,
            /* A GeoJSON coordinate. Please refer to IETF RFC 7946 for information on the GeoJSON format. */ GeoJsonCoordinate,
            /* A GeoJSON coordinate. Please refer to IETF RFC 7946 for information on the GeoJSON format. */ GeoJsonCoordinate,
            /* A GeoJSON coordinate. Please refer to IETF RFC 7946 for information on the GeoJSON format. */ GeoJsonCoordinate,
            .../* A GeoJSON coordinate. Please refer to IETF RFC 7946 for information on the GeoJSON format. */ GeoJsonCoordinate[]
        ][];
        /**
         * A geometry represented in Well-Known Text (WKT) format.
         */
        export type GeometryString = string | null; // wkt
        /**
         * Raw forecast data for a 2.5km grid square.
         * This is a list of all potential data layers that may appear. Some layers may not be present in all areas.
         * * temperature
         * * dewpoint
         * * maxTemperature
         * * minTemperature
         * * relativeHumidity
         * * apparentTemperature
         * * heatIndex
         * * windChill
         * * skyCover
         * * windDirection
         * * windSpeed
         * * windGust
         * * weather
         * * hazards: Watch and advisory products in effect
         * * probabilityOfPrecipitation
         * * quantitativePrecipitation
         * * iceAccumulation
         * * snowfallAmount
         * * snowLevel
         * * ceilingHeight
         * * visibility
         * * transportWindSpeed
         * * transportWindDirection
         * * mixingHeight
         * * hainesIndex
         * * lightningActivityLevel
         * * twentyFootWindSpeed
         * * twentyFootWindDirection
         * * waveHeight
         * * wavePeriod
         * * waveDirection
         * * primarySwellHeight
         * * primarySwellDirection
         * * secondarySwellHeight
         * * secondarySwellDirection
         * * wavePeriod2
         * * windWaveHeight
         * * dispersionIndex
         * * pressure: Barometric pressure
         * * probabilityOfTropicalStormWinds
         * * probabilityOfHurricaneWinds
         * * potentialOf15mphWinds
         * * potentialOf25mphWinds
         * * potentialOf35mphWinds
         * * potentialOf45mphWinds
         * * potentialOf20mphWindGusts
         * * potentialOf30mphWindGusts
         * * potentialOf40mphWindGusts
         * * potentialOf50mphWindGusts
         * * potentialOf60mphWindGusts
         * * grasslandFireDangerIndex
         * * probabilityOfThunder
         * * davisStabilityIndex
         * * atmosphericDispersionIndex
         * * lowVisibilityOccurrenceRiskIndex
         * * stability
         * * redFlagThreatIndex
         *
         */
        export interface Gridpoint {
            [name: string]: /**
             * A gridpoint layer consisting of quantitative values (numeric values with associated units of measure).
             *
             */
            GridpointQuantitativeValueLayer;
            "@context"?: JsonLdContext;
            geometry?: /* A geometry represented in Well-Known Text (WKT) format. */ GeometryString /* wkt */;
            "@id"?: string; // uri
            "@type"?: "wx:Gridpoint";
            updateTime?: string; // date-time
            validTimes?: /**
             * A time interval in ISO 8601 format. This can be one of:
             *
             *     1. Start and end time
             *     2. Start time and duration
             *     3. Duration and end time
             * The string "NOW" can also be used in place of a start/end time.
             *
             */
            ISO8601Interval;
            elevation?: /**
             * A structured value representing a measurement and its unit of measure. This object is a slighly modified version of the schema.org definition at https://schema.org/QuantitativeValue
             *
             */
            QuantitativeValue;
            forecastOffice?: string; // uri
            gridId?: string;
            gridX?: number;
            gridY?: number;
            weather?: {
                values: {
                    validTime: /**
                     * A time interval in ISO 8601 format. This can be one of:
                     *
                     *     1. Start and end time
                     *     2. Start time and duration
                     *     3. Duration and end time
                     * The string "NOW" can also be used in place of a start/end time.
                     *
                     */
                    ISO8601Interval;
                    value: {
                        coverage: "areas" | "brief" | "chance" | "definite" | "few" | "frequent" | "intermittent" | "isolated" | "likely" | "numerous" | "occasional" | "patchy" | "periods" | "scattered" | "slight_chance" | "widespread";
                        weather: "blowing_dust" | "blowing_sand" | "blowing_snow" | "drizzle" | "fog" | "freezing_fog" | "freezing_drizzle" | "freezing_rain" | "freezing_spray" | "frost" | "hail" | "haze" | "ice_crystals" | "ice_fog" | "rain" | "rain_showers" | "sleet" | "smoke" | "snow" | "snow_showers" | "thunderstorms" | "volcanic_ash" | "water_spouts";
                        intensity: "very_light" | "light" | "moderate" | "heavy";
                        visibility: /**
                         * A structured value representing a measurement and its unit of measure. This object is a slighly modified version of the schema.org definition at https://schema.org/QuantitativeValue
                         *
                         */
                        QuantitativeValue;
                        attributes: ("damaging_wind" | "dry_thunderstorms" | "flooding" | "gusty_wind" | "heavy_rain" | "large_hail" | "small_hail" | "tornadoes")[];
                    }[];
                }[];
            };
            hazards?: {
                values: {
                    validTime: /**
                     * A time interval in ISO 8601 format. This can be one of:
                     *
                     *     1. Start and end time
                     *     2. Start time and duration
                     *     3. Duration and end time
                     * The string "NOW" can also be used in place of a start/end time.
                     *
                     */
                    ISO8601Interval;
                    value: {
                        /**
                         * Hazard code. This value will correspond to a P-VTEC phenomenon code as defined in NWS Directive 10-1703.
                         *
                         */
                        phenomenon: string; // ^\w{2}$
                        /**
                         * Significance code. This value will correspond to a P-VTEC significance code as defined in NWS Directive 10-1703.
                         * This will most frequently be "A" for a watch or "Y" for an advisory.
                         *
                         */
                        significance: string; // ^\w$
                        /**
                         * Event number. If this hazard refers to a national or regional center product (such as a Storm Prediction Center convective watch), this value will be the sequence number of that product.
                         *
                         */
                        event_number: null | number;
                    }[];
                }[];
            };
        }
        /**
         * A multi-day forecast for a 2.5km grid square.
         */
        export interface GridpointForecast {
            "@context"?: JsonLdContext;
            geometry?: /* A geometry represented in Well-Known Text (WKT) format. */ GeometryString /* wkt */;
            units?: /* Denotes the units used in the textual portions of the forecast. */ GridpointForecastUnits;
            /**
             * The internal generator class used to create the forecast text (used for NWS debugging).
             */
            forecastGenerator?: string;
            /**
             * The time this forecast data was generated.
             */
            generatedAt?: string; // date-time
            /**
             * The last update time of the data this forecast was generated from.
             */
            updateTime?: string; // date-time
            /**
             * This property is deprecated (use updateTime instead).
             */
            updated?: string; // date-time
            validTimes?: /**
             * A time interval in ISO 8601 format. This can be one of:
             *
             *     1. Start and end time
             *     2. Start time and duration
             *     3. Duration and end time
             * The string "NOW" can also be used in place of a start/end time.
             *
             */
            ISO8601Interval;
            elevation?: /**
             * A structured value representing a measurement and its unit of measure. This object is a slighly modified version of the schema.org definition at https://schema.org/QuantitativeValue
             *
             */
            QuantitativeValue;
            /**
             * An array of forecast periods.
             */
            periods?: /**
             * An object containing forecast information for a specific time period (generally 12-hour or 1-hour).
             *
             */
            GridpointForecastPeriod[];
        }
        /**
         * A GeoJSON feature. Please refer to IETF RFC 7946 for information on the GeoJSON format.
         */
        export interface GridpointForecastGeoJson {
            "@context"?: JsonLdContext;
            id?: string; // uri
            type: "Feature";
            geometry: /* A GeoJSON geometry object. Please refer to IETF RFC 7946 for information on the GeoJSON format. */ GeoJsonGeometry;
            properties: /* A multi-day forecast for a 2.5km grid square. */ GridpointForecast;
        }
        /**
         * A multi-day forecast for a 2.5km grid square.
         */
        export interface GridpointForecastJsonLd {
            "@context": JsonLdContext;
            geometry: /* A geometry represented in Well-Known Text (WKT) format. */ GeometryString /* wkt */;
            units?: /* Denotes the units used in the textual portions of the forecast. */ GridpointForecastUnits;
            /**
             * The internal generator class used to create the forecast text (used for NWS debugging).
             */
            forecastGenerator?: string;
            /**
             * The time this forecast data was generated.
             */
            generatedAt?: string; // date-time
            /**
             * The last update time of the data this forecast was generated from.
             */
            updateTime?: string; // date-time
            /**
             * This property is deprecated (use updateTime instead).
             */
            updated?: string; // date-time
            validTimes?: /**
             * A time interval in ISO 8601 format. This can be one of:
             *
             *     1. Start and end time
             *     2. Start time and duration
             *     3. Duration and end time
             * The string "NOW" can also be used in place of a start/end time.
             *
             */
            ISO8601Interval;
            elevation?: /**
             * A structured value representing a measurement and its unit of measure. This object is a slighly modified version of the schema.org definition at https://schema.org/QuantitativeValue
             *
             */
            QuantitativeValue;
            /**
             * An array of forecast periods.
             */
            periods?: /**
             * An object containing forecast information for a specific time period (generally 12-hour or 1-hour).
             *
             */
            GridpointForecastPeriod[];
        }
        /**
         * An object containing forecast information for a specific time period (generally 12-hour or 1-hour).
         *
         */
        export interface GridpointForecastPeriod {
            /**
             * Sequential period number.
             */
            number?: number;
            /**
             * A textual identifier for the period. This value will not be present for hourly forecasts.
             *
             * example:
             * Tuesday Night
             */
            name?: string;
            /**
             * The starting time that this forecast period is valid for.
             */
            startTime?: string; // date-time
            /**
             * The ending time that this forecast period is valid for.
             */
            endTime?: string; // date-time
            /**
             * Indicates whether this period is daytime or nighttime.
             */
            isDaytime?: boolean;
            /**
             * High/low temperature for the period, depending on whether the period is day or night.
             * This property as an integer value is deprecated. Future versions will express this value as a quantitative value object. To make use of the future standard format now, set the "forecast_temperature_qv" feature flag on the request.
             *
             */
            temperature?: /**
             * High/low temperature for the period, depending on whether the period is day or night.
             * This property as an integer value is deprecated. Future versions will express this value as a quantitative value object. To make use of the future standard format now, set the "forecast_temperature_qv" feature flag on the request.
             *
             */
            /**
             * A structured value representing a measurement and its unit of measure. This object is a slighly modified version of the schema.org definition at https://schema.org/QuantitativeValue
             *
             */
            QuantitativeValue | number;
            /**
             * The unit of the temperature value (Fahrenheit or Celsius).
             * This property is deprecated. Future versions will indicate the unit within the quantitative value object for the temperature property. To make use of the future standard format now, set the "forecast_temperature_qv" feature flag on the request.
             *
             */
            temperatureUnit?: "F" | "C";
            /**
             * If not null, indicates a non-diurnal temperature trend for the period (either rising temperature overnight, or falling temperature during the day)
             *
             */
            temperatureTrend?: "rising" | "falling";
            /**
             * Wind speed for the period.
             * This property as an string value is deprecated. Future versions will express this value as a quantitative value object. To make use of the future standard format now, set the "forecast_wind_speed_qv" feature flag on the request.
             *
             */
            windSpeed?: /**
             * Wind speed for the period.
             * This property as an string value is deprecated. Future versions will express this value as a quantitative value object. To make use of the future standard format now, set the "forecast_wind_speed_qv" feature flag on the request.
             *
             */
            /**
             * A structured value representing a measurement and its unit of measure. This object is a slighly modified version of the schema.org definition at https://schema.org/QuantitativeValue
             *
             */
            QuantitativeValue | string;
            /**
             * Peak wind gust for the period.
             * This property as an string value is deprecated. Future versions will express this value as a quantitative value object. To make use of the future standard format now, set the "forecast_wind_speed_qv" feature flag on the request.
             *
             */
            windGust?: /**
             * Peak wind gust for the period.
             * This property as an string value is deprecated. Future versions will express this value as a quantitative value object. To make use of the future standard format now, set the "forecast_wind_speed_qv" feature flag on the request.
             *
             */
            /**
             * A structured value representing a measurement and its unit of measure. This object is a slighly modified version of the schema.org definition at https://schema.org/QuantitativeValue
             *
             */
            QuantitativeValue | null;
            /**
             * The prevailing direction of the wind for the period, using a 16-point compass.
             */
            windDirection?: "N" | "NNE" | "NE" | "ENE" | "E" | "ESE" | "SE" | "SSE" | "S" | "SSW" | "SW" | "WSW" | "W" | "WNW" | "NW" | "NNW";
            /**
             * A link to an icon representing the forecast summary.
             */
            icon?: string; // uri
            /**
             * A brief textual forecast summary for the period.
             */
            shortForecast?: string;
            /**
             * A detailed textual forecast for the period.
             */
            detailedForecast?: string;
        }
        /**
         * Denotes the units used in the textual portions of the forecast.
         */
        export type GridpointForecastUnits = "us" | "si";
        /**
         * A GeoJSON feature. Please refer to IETF RFC 7946 for information on the GeoJSON format.
         */
        export interface GridpointGeoJson {
            "@context"?: JsonLdContext;
            id?: string; // uri
            type: "Feature";
            geometry: /* A GeoJSON geometry object. Please refer to IETF RFC 7946 for information on the GeoJSON format. */ GeoJsonGeometry;
            properties: /**
             * Raw forecast data for a 2.5km grid square.
             * This is a list of all potential data layers that may appear. Some layers may not be present in all areas.
             * * temperature
             * * dewpoint
             * * maxTemperature
             * * minTemperature
             * * relativeHumidity
             * * apparentTemperature
             * * heatIndex
             * * windChill
             * * skyCover
             * * windDirection
             * * windSpeed
             * * windGust
             * * weather
             * * hazards: Watch and advisory products in effect
             * * probabilityOfPrecipitation
             * * quantitativePrecipitation
             * * iceAccumulation
             * * snowfallAmount
             * * snowLevel
             * * ceilingHeight
             * * visibility
             * * transportWindSpeed
             * * transportWindDirection
             * * mixingHeight
             * * hainesIndex
             * * lightningActivityLevel
             * * twentyFootWindSpeed
             * * twentyFootWindDirection
             * * waveHeight
             * * wavePeriod
             * * waveDirection
             * * primarySwellHeight
             * * primarySwellDirection
             * * secondarySwellHeight
             * * secondarySwellDirection
             * * wavePeriod2
             * * windWaveHeight
             * * dispersionIndex
             * * pressure: Barometric pressure
             * * probabilityOfTropicalStormWinds
             * * probabilityOfHurricaneWinds
             * * potentialOf15mphWinds
             * * potentialOf25mphWinds
             * * potentialOf35mphWinds
             * * potentialOf45mphWinds
             * * potentialOf20mphWindGusts
             * * potentialOf30mphWindGusts
             * * potentialOf40mphWindGusts
             * * potentialOf50mphWindGusts
             * * potentialOf60mphWindGusts
             * * grasslandFireDangerIndex
             * * probabilityOfThunder
             * * davisStabilityIndex
             * * atmosphericDispersionIndex
             * * lowVisibilityOccurrenceRiskIndex
             * * stability
             * * redFlagThreatIndex
             *
             */
            Gridpoint;
        }
        export type GridpointJsonLd = /**
         * Raw forecast data for a 2.5km grid square.
         * This is a list of all potential data layers that may appear. Some layers may not be present in all areas.
         * * temperature
         * * dewpoint
         * * maxTemperature
         * * minTemperature
         * * relativeHumidity
         * * apparentTemperature
         * * heatIndex
         * * windChill
         * * skyCover
         * * windDirection
         * * windSpeed
         * * windGust
         * * weather
         * * hazards: Watch and advisory products in effect
         * * probabilityOfPrecipitation
         * * quantitativePrecipitation
         * * iceAccumulation
         * * snowfallAmount
         * * snowLevel
         * * ceilingHeight
         * * visibility
         * * transportWindSpeed
         * * transportWindDirection
         * * mixingHeight
         * * hainesIndex
         * * lightningActivityLevel
         * * twentyFootWindSpeed
         * * twentyFootWindDirection
         * * waveHeight
         * * wavePeriod
         * * waveDirection
         * * primarySwellHeight
         * * primarySwellDirection
         * * secondarySwellHeight
         * * secondarySwellDirection
         * * wavePeriod2
         * * windWaveHeight
         * * dispersionIndex
         * * pressure: Barometric pressure
         * * probabilityOfTropicalStormWinds
         * * probabilityOfHurricaneWinds
         * * potentialOf15mphWinds
         * * potentialOf25mphWinds
         * * potentialOf35mphWinds
         * * potentialOf45mphWinds
         * * potentialOf20mphWindGusts
         * * potentialOf30mphWindGusts
         * * potentialOf40mphWindGusts
         * * potentialOf50mphWindGusts
         * * potentialOf60mphWindGusts
         * * grasslandFireDangerIndex
         * * probabilityOfThunder
         * * davisStabilityIndex
         * * atmosphericDispersionIndex
         * * lowVisibilityOccurrenceRiskIndex
         * * stability
         * * redFlagThreatIndex
         *
         */
        Gridpoint;
        /**
         * A gridpoint layer consisting of quantitative values (numeric values with associated units of measure).
         *
         */
        export interface GridpointQuantitativeValueLayer {
            uom?: /**
             * A string denoting a unit of measure, expressed in the format "{unit}" or "{namespace}:{unit}".
             * Units with the namespace "wmo" or "wmoUnit" are defined in the World Meteorological Organization Codes Registry at http://codes.wmo.int/common/unit and should be canonically resolvable to http://codes.wmo.int/common/unit/{unit}.
             * Units with the namespace "nwsUnit" are currently custom and do not align to any standard.
             * Units with no namespace or the namespace "uc" are compliant with the Unified Code for Units of Measure syntax defined at https://unitsofmeasure.org/. This also aligns with recent versions of the Geographic Markup Language (GML) standard, the IWXXM standard, and OGC Observations and Measurements v2.0 (ISO/DIS 19156).
             * Namespaced units are considered deprecated. We will be aligning API to use the same standards as GML/IWXXM in the future.
             *
             */
            UnitOfMeasure /* ^((wmo|uc|wmoUnit|nwsUnit):)?.*$ */;
            values: {
                validTime: /**
                 * A time interval in ISO 8601 format. This can be one of:
                 *
                 *     1. Start and end time
                 *     2. Start time and duration
                 *     3. Duration and end time
                 * The string "NOW" can also be used in place of a start/end time.
                 *
                 */
                ISO8601Interval;
                value: number | null;
            }[];
        }
        /**
         * A time duration in ISO 8601 format.
         * example:
         * P2DT12H
         */
        export type ISO8601Duration = string; // ^P(\d+Y)?(\d+M)?(\d+D)?(T(\d+H)?(\d+M)?(\d+S)?)?$
        /**
         * A time interval in ISO 8601 format. This can be one of:
         *
         *     1. Start and end time
         *     2. Start time and duration
         *     3. Duration and end time
         * The string "NOW" can also be used in place of a start/end time.
         *
         */
        export type ISO8601Interval = /**
         * A time interval in ISO 8601 format. This can be one of:
         *
         *     1. Start and end time
         *     2. Start time and duration
         *     3. Duration and end time
         * The string "NOW" can also be used in place of a start/end time.
         *
         */
        string /* ^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(Z|[+-]\d{2}:?\d{2}?)|NOW)\/(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(Z|[+-]\d{2}:?\d{2}?)|NOW)$ */ | string /* ^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(Z|[+-]\d{2}:?\d{2}?)|NOW)\/P(\d+Y)?(\d+M)?(\d+D)?(T(\d+H)?(\d+M)?(\d+S)?)?$ */ | string /* ^P(\d+Y)?(\d+M)?(\d+D)?(T(\d+H)?(\d+M)?(\d+S)?)?\/(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(Z|[+-]\d{2}:?\d{2}?)|NOW)$ */;
        export type JsonLdContext = any[] | {
            [key: string]: any;
        };
        /**
         * Land region code. These correspond to the six NWS regional headquarters:
         * * AR: Alaska Region
         * * CR: Central Region
         * * ER: Eastern Region
         * * PR: Pacific Region
         * * SR: Southern Region
         * * WR: Western Region
         *
         */
        export type LandRegionCode = "AR" | "CR" | "ER" | "PR" | "SR" | "WR";
        /**
         * Marine area code as defined in NWS Directive 10-302:
         * * AM: Western North Atlantic Ocean and along U.S. East Coast south of Currituck Beach Light NC following the coastline into Gulf of Mexico to Ocean Reef FL including the Caribbean
         * * AN: Western North Atlantic Ocean and along U.S. East Coast from Canadian border south to Currituck Beach Light NC
         * * GM: Gulf of Mexico and along the U.S. Gulf Coast from the Mexican border to Ocean Reef FL
         * * LC: Lake St. Clair
         * * LE: Lake Erie
         * * LH: Lake Huron
         * * LM: Lake Michigan
         * * LO: Lake Ontario
         * * LS: Lake Superior
         * * PH: Central Pacific Ocean including Hawaiian waters
         * * PK: North Pacific Ocean near Alaska and along Alaska coastline including the Bering Sea and the Gulf of Alaska
         * * PM: Western Pacific Ocean including Mariana Island waters
         * * PS: South Central Pacific Ocean including American Samoa waters
         * * PZ: Eastern North Pacific Ocean and along U.S. West Coast from Canadian border to Mexican border
         * * SL: St. Lawrence River above St. Regis
         *
         */
        export type MarineAreaCode = "AM" | "AN" | "GM" | "LC" | "LE" | "LH" | "LM" | "LO" | "LS" | "PH" | "PK" | "PM" | "PS" | "PZ" | "SL";
        /**
         * Marine region code. These are groups of marine areas combined.
         * * AL: Alaska waters (PK)
         * * AT: Atlantic Ocean (AM, AN)
         * * GL: Great Lakes (LC, LE, LH, LM, LO, LS, SL)
         * * GM: Gulf of Mexico (GM)
         * * PA: Eastern Pacific Ocean and U.S. West Coast (PZ)
         * * PI: Central and Western Pacific (PH, PM, PS)
         *
         */
        export type MarineRegionCode = "AL" | "AT" | "GL" | "GM" | "PA" | "PI";
        /**
         * An object representing a decoded METAR phenomenon string.
         */
        export interface MetarPhenomenon {
            intensity: "light" | "heavy";
            modifier: "patches" | "blowing" | "low_drifting" | "freezing" | "shallow" | "partial" | "showers";
            weather: "fog_mist" | "dust_storm" | "dust" | "drizzle" | "funnel_cloud" | "fog" | "smoke" | "hail" | "snow_pellets" | "haze" | "ice_crystals" | "ice_pellets" | "dust_whirls" | "spray" | "rain" | "sand" | "snow_grains" | "snow" | "squalls" | "sand_storm" | "thunderstorms" | "unknown" | "volcanic_ash";
            rawString: string;
            inVicinity?: boolean;
        }
        export type MetarSkyCoverage = "OVC" | "BKN" | "SCT" | "FEW" | "SKC" | "CLR" | "VV";
        /**
         * Three-letter identifier for a NWS office.
         */
        export type NWSForecastOfficeId = "AKQ" | "ALY" | "BGM" | "BOX" | "BTV" | "BUF" | "CAE" | "CAR" | "CHS" | "CLE" | "CTP" | "GSP" | "GYX" | "ILM" | "ILN" | "LWX" | "MHX" | "OKX" | "PBZ" | "PHI" | "RAH" | "RLX" | "RNK" | "ABQ" | "AMA" | "BMX" | "BRO" | "CRP" | "EPZ" | "EWX" | "FFC" | "FWD" | "HGX" | "HUN" | "JAN" | "JAX" | "KEY" | "LCH" | "LIX" | "LUB" | "LZK" | "MAF" | "MEG" | "MFL" | "MLB" | "MOB" | "MRX" | "OHX" | "OUN" | "SHV" | "SJT" | "SJU" | "TAE" | "TBW" | "TSA" | "ABR" | "APX" | "ARX" | "BIS" | "BOU" | "CYS" | "DDC" | "DLH" | "DMX" | "DTX" | "DVN" | "EAX" | "FGF" | "FSD" | "GID" | "GJT" | "GLD" | "GRB" | "GRR" | "ICT" | "ILX" | "IND" | "IWX" | "JKL" | "LBF" | "LMK" | "LOT" | "LSX" | "MKX" | "MPX" | "MQT" | "OAX" | "PAH" | "PUB" | "RIW" | "SGF" | "TOP" | "UNR" | "BOI" | "BYZ" | "EKA" | "FGZ" | "GGW" | "HNX" | "LKN" | "LOX" | "MFR" | "MSO" | "MTR" | "OTX" | "PDT" | "PIH" | "PQR" | "PSR" | "REV" | "SEW" | "SGX" | "SLC" | "STO" | "TFX" | "TWC" | "VEF" | "AER" | "AFC" | "AFG" | "AJK" | "ALU" | "GUM" | "HPA" | "HFO" | "PPG" | "STU" | "NH1" | "NH2" | "ONA" | "ONP";
        /**
         * UGC identifier for a NWS forecast zone or county.
         * The first two letters will correspond to either a state code or marine area code (see #/components/schemas/StateTerritoryCode and #/components/schemas/MarineAreaCode for lists of valid letter combinations).
         * The third letter will be Z for public/fire zone or C for county.
         *
         */
        export type NWSZoneID = string; // ^(A[KLMNRSZ]|C[AOT]|D[CE]|FL|G[AMU]|I[ADLN]|K[SY]|L[ACEHMOS]|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AHKMRSZ]|S[CDL]|T[NX]|UT|V[AIT]|W[AIVY]|[HR]I)[CZ]\d{3}$
        export type NWSZoneType = "land" | "marine" | "forecast" | "public" | "coastal" | "offshore" | "fire" | "county";
        export interface Observation {
            "@context"?: JsonLdContext;
            geometry?: /* A geometry represented in Well-Known Text (WKT) format. */ GeometryString /* wkt */;
            "@id"?: string; // uri
            "@type"?: "wx:ObservationStation";
            elevation?: /**
             * A structured value representing a measurement and its unit of measure. This object is a slighly modified version of the schema.org definition at https://schema.org/QuantitativeValue
             *
             */
            QuantitativeValue;
            station?: string; // uri
            timestamp?: string; // date-time
            rawMessage?: string;
            textDescription?: string;
            icon?: string; // uri
            presentWeather?: /* An object representing a decoded METAR phenomenon string. */ MetarPhenomenon[];
            temperature?: /**
             * A structured value representing a measurement and its unit of measure. This object is a slighly modified version of the schema.org definition at https://schema.org/QuantitativeValue
             *
             */
            QuantitativeValue;
            dewpoint?: /**
             * A structured value representing a measurement and its unit of measure. This object is a slighly modified version of the schema.org definition at https://schema.org/QuantitativeValue
             *
             */
            QuantitativeValue;
            windDirection?: /**
             * A structured value representing a measurement and its unit of measure. This object is a slighly modified version of the schema.org definition at https://schema.org/QuantitativeValue
             *
             */
            QuantitativeValue;
            windSpeed?: /**
             * A structured value representing a measurement and its unit of measure. This object is a slighly modified version of the schema.org definition at https://schema.org/QuantitativeValue
             *
             */
            QuantitativeValue;
            windGust?: /**
             * A structured value representing a measurement and its unit of measure. This object is a slighly modified version of the schema.org definition at https://schema.org/QuantitativeValue
             *
             */
            QuantitativeValue;
            barometricPressure?: /**
             * A structured value representing a measurement and its unit of measure. This object is a slighly modified version of the schema.org definition at https://schema.org/QuantitativeValue
             *
             */
            QuantitativeValue;
            seaLevelPressure?: /**
             * A structured value representing a measurement and its unit of measure. This object is a slighly modified version of the schema.org definition at https://schema.org/QuantitativeValue
             *
             */
            QuantitativeValue;
            visibility?: /**
             * A structured value representing a measurement and its unit of measure. This object is a slighly modified version of the schema.org definition at https://schema.org/QuantitativeValue
             *
             */
            QuantitativeValue;
            maxTemperatureLast24Hours?: /**
             * A structured value representing a measurement and its unit of measure. This object is a slighly modified version of the schema.org definition at https://schema.org/QuantitativeValue
             *
             */
            QuantitativeValue;
            minTemperatureLast24Hours?: /**
             * A structured value representing a measurement and its unit of measure. This object is a slighly modified version of the schema.org definition at https://schema.org/QuantitativeValue
             *
             */
            QuantitativeValue;
            precipitationLastHour?: /**
             * A structured value representing a measurement and its unit of measure. This object is a slighly modified version of the schema.org definition at https://schema.org/QuantitativeValue
             *
             */
            QuantitativeValue;
            precipitationLast3Hours?: /**
             * A structured value representing a measurement and its unit of measure. This object is a slighly modified version of the schema.org definition at https://schema.org/QuantitativeValue
             *
             */
            QuantitativeValue;
            precipitationLast6Hours?: /**
             * A structured value representing a measurement and its unit of measure. This object is a slighly modified version of the schema.org definition at https://schema.org/QuantitativeValue
             *
             */
            QuantitativeValue;
            relativeHumidity?: /**
             * A structured value representing a measurement and its unit of measure. This object is a slighly modified version of the schema.org definition at https://schema.org/QuantitativeValue
             *
             */
            QuantitativeValue;
            windChill?: /**
             * A structured value representing a measurement and its unit of measure. This object is a slighly modified version of the schema.org definition at https://schema.org/QuantitativeValue
             *
             */
            QuantitativeValue;
            heatIndex?: /**
             * A structured value representing a measurement and its unit of measure. This object is a slighly modified version of the schema.org definition at https://schema.org/QuantitativeValue
             *
             */
            QuantitativeValue;
            cloudLayers?: {
                base: /**
                 * A structured value representing a measurement and its unit of measure. This object is a slighly modified version of the schema.org definition at https://schema.org/QuantitativeValue
                 *
                 */
                QuantitativeValue;
                amount: MetarSkyCoverage;
            }[];
        }
        /**
         * A GeoJSON feature collection. Please refer to IETF RFC 7946 for information on the GeoJSON format.
         */
        export interface ObservationCollectionGeoJson {
            "@context"?: JsonLdContext;
            type: "FeatureCollection";
            features: /* A GeoJSON feature. Please refer to IETF RFC 7946 for information on the GeoJSON format. */ GeoJsonFeature[];
        }
        export interface ObservationCollectionJsonLd {
            "@context"?: JsonLdContext;
            "@graph"?: Observation[];
        }
        /**
         * A GeoJSON feature. Please refer to IETF RFC 7946 for information on the GeoJSON format.
         */
        export interface ObservationGeoJson {
            "@context"?: JsonLdContext;
            id?: string; // uri
            type: "Feature";
            geometry: /* A GeoJSON geometry object. Please refer to IETF RFC 7946 for information on the GeoJSON format. */ GeoJsonGeometry;
            properties: Observation;
        }
        export type ObservationJsonLd = Observation;
        export interface ObservationStation {
            "@context"?: JsonLdContext;
            geometry?: /* A geometry represented in Well-Known Text (WKT) format. */ GeometryString /* wkt */;
            "@id"?: string; // uri
            "@type"?: "wx:ObservationStation";
            elevation?: /**
             * A structured value representing a measurement and its unit of measure. This object is a slighly modified version of the schema.org definition at https://schema.org/QuantitativeValue
             *
             */
            QuantitativeValue;
            stationIdentifier?: string;
            name?: string;
            timeZone?: string; // iana-time-zone-identifier
            /**
             * A link to the NWS public forecast zone containing this station.
             */
            forecast?: string; // uri
            /**
             * A link to the NWS county zone containing this station.
             */
            county?: string; // uri
            /**
             * A link to the NWS fire weather forecast zone containing this station.
             */
            fireWeatherZone?: string; // uri
        }
        /**
         * A GeoJSON feature collection. Please refer to IETF RFC 7946 for information on the GeoJSON format.
         */
        export interface ObservationStationCollectionGeoJson {
            "@context"?: JsonLdContext;
            type: "FeatureCollection";
            features: /* A GeoJSON feature. Please refer to IETF RFC 7946 for information on the GeoJSON format. */ GeoJsonFeature[];
            observationStations?: string /* uri */[];
        }
        export interface ObservationStationCollectionJsonLd {
            "@context"?: JsonLdContext;
            "@graph"?: ObservationStation[];
            observationStations?: string /* uri */[];
        }
        /**
         * A GeoJSON feature. Please refer to IETF RFC 7946 for information on the GeoJSON format.
         */
        export interface ObservationStationGeoJson {
            "@context"?: JsonLdContext;
            id?: string; // uri
            type: "Feature";
            geometry: /* A GeoJSON geometry object. Please refer to IETF RFC 7946 for information on the GeoJSON format. */ GeoJsonGeometry;
            properties: ObservationStation;
        }
        export interface ObservationStationJsonLd {
            "@context": JsonLdContext;
            geometry: /* A geometry represented in Well-Known Text (WKT) format. */ GeometryString /* wkt */;
            "@id"?: string; // uri
            "@type"?: "wx:ObservationStation";
            elevation?: /**
             * A structured value representing a measurement and its unit of measure. This object is a slighly modified version of the schema.org definition at https://schema.org/QuantitativeValue
             *
             */
            QuantitativeValue;
            stationIdentifier?: string;
            name?: string;
            timeZone?: string; // iana-time-zone-identifier
            /**
             * A link to the NWS public forecast zone containing this station.
             */
            forecast?: string; // uri
            /**
             * A link to the NWS county zone containing this station.
             */
            county?: string; // uri
            /**
             * A link to the NWS fire weather forecast zone containing this station.
             */
            fireWeatherZone?: string; // uri
        }
        export interface Office {
            "@context"?: JsonLdContext;
            "@type"?: "GovernmentOrganization";
            "@id"?: string; // uri
            id?: string;
            name?: string;
            address?: {
                "@type"?: "PostalAddress";
                streetAddress?: string;
                addressLocality?: string;
                addressRegion?: string;
                postalCode?: string;
            };
            telephone?: string;
            faxNumber?: string;
            email?: string;
            sameAs?: string; // uri
            nwsRegion?: string;
            parentOrganization?: string; // uri
            responsibleCounties?: string /* uri */[];
            responsibleForecastZones?: string /* uri */[];
            responsibleFireZones?: string /* uri */[];
            approvedObservationStations?: string /* uri */[];
        }
        export interface OfficeHeadline {
            "@context"?: JsonLdContext;
            "@id"?: string; // uri
            id?: string;
            office?: string; // uri
            important?: boolean;
            issuanceTime?: string; // date-time
            link?: string; // uri
            name?: string;
            title?: string;
            summary?: string | null;
            content?: string;
        }
        export interface OfficeHeadlineCollection {
            "@context": JsonLdContext;
            "@graph": OfficeHeadline[];
        }
        export interface Point {
            "@context"?: JsonLdContext;
            geometry?: /* A geometry represented in Well-Known Text (WKT) format. */ GeometryString /* wkt */;
            "@id"?: string; // uri
            "@type"?: "wx:Point";
            cwa?: /* Three-letter identifier for a NWS office. */ NWSForecastOfficeId;
            forecastOffice?: string; // uri
            gridId?: /* Three-letter identifier for a NWS office. */ NWSForecastOfficeId;
            gridX?: number;
            gridY?: number;
            forecast?: string; // uri
            forecastHourly?: string; // uri
            forecastGridData?: string; // uri
            observationStations?: string; // uri
            relativeLocation?: /* A GeoJSON feature. Please refer to IETF RFC 7946 for information on the GeoJSON format. */ RelativeLocationGeoJson | RelativeLocationJsonLd;
            forecastZone?: string; // uri
            county?: string; // uri
            fireWeatherZone?: string; // uri
            timeZone?: string;
            radarStation?: string;
        }
        /**
         * A GeoJSON feature. Please refer to IETF RFC 7946 for information on the GeoJSON format.
         */
        export interface PointGeoJson {
            "@context"?: JsonLdContext;
            id?: string; // uri
            type: "Feature";
            geometry: /* A GeoJSON geometry object. Please refer to IETF RFC 7946 for information on the GeoJSON format. */ GeoJsonGeometry;
            properties: Point;
        }
        export interface PointJsonLd {
            "@context": JsonLdContext;
            geometry: /* A geometry represented in Well-Known Text (WKT) format. */ GeometryString /* wkt */;
            "@id"?: string; // uri
            "@type"?: "wx:Point";
            cwa?: /* Three-letter identifier for a NWS office. */ NWSForecastOfficeId;
            forecastOffice?: string; // uri
            gridId?: /* Three-letter identifier for a NWS office. */ NWSForecastOfficeId;
            gridX?: number;
            gridY?: number;
            forecast?: string; // uri
            forecastHourly?: string; // uri
            forecastGridData?: string; // uri
            observationStations?: string; // uri
            relativeLocation?: /* A GeoJSON feature. Please refer to IETF RFC 7946 for information on the GeoJSON format. */ RelativeLocationGeoJson | RelativeLocationJsonLd;
            forecastZone?: string; // uri
            county?: string; // uri
            fireWeatherZone?: string; // uri
            timeZone?: string;
            radarStation?: string;
        }
        export type PointString = string; // ^(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)$
        /**
         * Detail about an error. This document conforms to RFC 7807 (Problem Details for HTTP APIs).
         */
        export interface ProblemDetail {
            [name: string]: any;
            /**
             * A URI reference (RFC 3986) that identifies the problem type. This is only an identifier and is not necessarily a resolvable URL.
             *
             * example:
             * urn:noaa:nws:api:UnexpectedProblem
             */
            type: string; // uri
            /**
             * A short, human-readable summary of the problem type.
             * example:
             * Unexpected Problem
             */
            title: string;
            /**
             * The HTTP status code (RFC 7231, Section 6) generated by the origin server for this occurrence of the problem.
             *
             * example:
             * 500
             */
            status: number;
            /**
             * A human-readable explanation specific to this occurrence of the problem.
             * example:
             * An unexpected problem has occurred.
             */
            detail: string;
            /**
             * A URI reference (RFC 3986) that identifies the specific occurrence of the problem. This is only an identifier and is not necessarily a resolvable URL.
             *
             * example:
             * urn:noaa:nws:api:request:493c3a1d-f87e-407f-ae2c-24483f5aab63
             */
            instance: string; // uri
            /**
             * A unique identifier for the request, used for NWS debugging purposes. Please include this identifier with any correspondence to help us investigate your issue.
             *
             * example:
             * 493c3a1d-f87e-407f-ae2c-24483f5aab63
             */
            correlationId: string;
        }
        /**
         * A structured value representing a measurement and its unit of measure. This object is a slighly modified version of the schema.org definition at https://schema.org/QuantitativeValue
         *
         */
        export interface QuantitativeValue {
            /**
             * A measured value
             */
            value?: number | null;
            /**
             * The maximum value of a range of measured values
             */
            maxValue?: number;
            /**
             * The minimum value of a range of measured values
             */
            minValue?: number;
            unitCode?: /**
             * A string denoting a unit of measure, expressed in the format "{unit}" or "{namespace}:{unit}".
             * Units with the namespace "wmo" or "wmoUnit" are defined in the World Meteorological Organization Codes Registry at http://codes.wmo.int/common/unit and should be canonically resolvable to http://codes.wmo.int/common/unit/{unit}.
             * Units with the namespace "nwsUnit" are currently custom and do not align to any standard.
             * Units with no namespace or the namespace "uc" are compliant with the Unified Code for Units of Measure syntax defined at https://unitsofmeasure.org/. This also aligns with recent versions of the Geographic Markup Language (GML) standard, the IWXXM standard, and OGC Observations and Measurements v2.0 (ISO/DIS 19156).
             * Namespaced units are considered deprecated. We will be aligning API to use the same standards as GML/IWXXM in the future.
             *
             */
            UnitOfMeasure /* ^((wmo|uc|wmoUnit|nwsUnit):)?.*$ */;
            /**
             * For values in observation records, the quality control flag from the MADIS system. The definitions of these flags can be found at https://madis.ncep.noaa.gov/madis_sfc_qc_notes.shtml
             *
             */
            qualityControl?: "Z" | "C" | "S" | "V" | "X" | "Q" | "G" | "B" | "T";
        }
        export type RegionCode = /**
         * Land region code. These correspond to the six NWS regional headquarters:
         * * AR: Alaska Region
         * * CR: Central Region
         * * ER: Eastern Region
         * * PR: Pacific Region
         * * SR: Southern Region
         * * WR: Western Region
         *
         */
        LandRegionCode | /**
         * Marine region code. These are groups of marine areas combined.
         * * AL: Alaska waters (PK)
         * * AT: Atlantic Ocean (AM, AN)
         * * GL: Great Lakes (LC, LE, LH, LM, LO, LS, SL)
         * * GM: Gulf of Mexico (GM)
         * * PA: Eastern Pacific Ocean and U.S. West Coast (PZ)
         * * PI: Central and Western Pacific (PH, PM, PS)
         *
         */
        MarineRegionCode;
        export interface RelativeLocation {
            city?: string;
            state?: string;
            distance?: /**
             * A structured value representing a measurement and its unit of measure. This object is a slighly modified version of the schema.org definition at https://schema.org/QuantitativeValue
             *
             */
            QuantitativeValue;
            bearing?: /**
             * A structured value representing a measurement and its unit of measure. This object is a slighly modified version of the schema.org definition at https://schema.org/QuantitativeValue
             *
             */
            QuantitativeValue;
        }
        /**
         * A GeoJSON feature. Please refer to IETF RFC 7946 for information on the GeoJSON format.
         */
        export interface RelativeLocationGeoJson {
            "@context"?: JsonLdContext;
            id?: string; // uri
            type: "Feature";
            geometry: /* A GeoJSON geometry object. Please refer to IETF RFC 7946 for information on the GeoJSON format. */ GeoJsonGeometry;
            properties: RelativeLocation;
        }
        export interface RelativeLocationJsonLd {
            city?: string;
            state?: string;
            distance?: /**
             * A structured value representing a measurement and its unit of measure. This object is a slighly modified version of the schema.org definition at https://schema.org/QuantitativeValue
             *
             */
            QuantitativeValue;
            bearing?: /**
             * A structured value representing a measurement and its unit of measure. This object is a slighly modified version of the schema.org definition at https://schema.org/QuantitativeValue
             *
             */
            QuantitativeValue;
            geometry: /* A geometry represented in Well-Known Text (WKT) format. */ GeometryString /* wkt */;
        }
        export type StateTerritoryCode = "AL" | "AK" | "AS" | "AR" | "AZ" | "CA" | "CO" | "CT" | "DE" | "DC" | "FL" | "GA" | "GU" | "HI" | "ID" | "IL" | "IN" | "IA" | "KS" | "KY" | "LA" | "ME" | "MD" | "MA" | "MI" | "MN" | "MS" | "MO" | "MT" | "NE" | "NV" | "NH" | "NJ" | "NM" | "NY" | "NC" | "ND" | "OH" | "OK" | "OR" | "PA" | "PR" | "RI" | "SC" | "SD" | "TN" | "TX" | "UT" | "VT" | "VI" | "VA" | "WA" | "WV" | "WI" | "WY";
        export interface TextProduct {
            "@context"?: JsonLdContext;
            "@id"?: string; // uri
            id?: string;
            wmoCollectiveId?: string;
            issuingOffice?: string;
            issuanceTime?: string; // date-time
            productCode?: string;
            productName?: string;
            productText?: string;
        }
        export interface TextProductCollection {
            "@context"?: JsonLdContext;
            "@graph"?: TextProduct[];
        }
        export interface TextProductLocationCollection {
            "@context"?: JsonLdContext;
            locations?: {
                [name: string]: string | null;
            };
        }
        export interface TextProductTypeCollection {
            "@context"?: JsonLdContext;
            "@graph"?: {
                productCode: string;
                productName: string;
            }[];
        }
        /**
         * A string denoting a unit of measure, expressed in the format "{unit}" or "{namespace}:{unit}".
         * Units with the namespace "wmo" or "wmoUnit" are defined in the World Meteorological Organization Codes Registry at http://codes.wmo.int/common/unit and should be canonically resolvable to http://codes.wmo.int/common/unit/{unit}.
         * Units with the namespace "nwsUnit" are currently custom and do not align to any standard.
         * Units with no namespace or the namespace "uc" are compliant with the Unified Code for Units of Measure syntax defined at https://unitsofmeasure.org/. This also aligns with recent versions of the Geographic Markup Language (GML) standard, the IWXXM standard, and OGC Observations and Measurements v2.0 (ISO/DIS 19156).
         * Namespaced units are considered deprecated. We will be aligning API to use the same standards as GML/IWXXM in the future.
         *
         */
        export type UnitOfMeasure = string; // ^((wmo|uc|wmoUnit|nwsUnit):)?.*$
        export interface Zone {
            "@context"?: JsonLdContext;
            geometry?: /* A geometry represented in Well-Known Text (WKT) format. */ GeometryString /* wkt */;
            "@id"?: string; // uri
            "@type"?: "wx:Zone";
            id?: /**
             * UGC identifier for a NWS forecast zone or county.
             * The first two letters will correspond to either a state code or marine area code (see #/components/schemas/StateTerritoryCode and #/components/schemas/MarineAreaCode for lists of valid letter combinations).
             * The third letter will be Z for public/fire zone or C for county.
             *
             */
            NWSZoneID /* ^(A[KLMNRSZ]|C[AOT]|D[CE]|FL|G[AMU]|I[ADLN]|K[SY]|L[ACEHMOS]|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AHKMRSZ]|S[CDL]|T[NX]|UT|V[AIT]|W[AIVY]|[HR]I)[CZ]\d{3}$ */;
            type?: NWSZoneType;
            name?: string;
            effectiveDate?: string; // date-time
            expirationDate?: string; // date-time
            state?: StateTerritoryCode | ("");
            cwa?: /* Three-letter identifier for a NWS office. */ NWSForecastOfficeId[];
            forecastOffices?: string /* uri */[];
            timeZone?: string /* iana-time-zone-identifier */[];
            observationStations?: string /* uri */[];
            radarStation?: string | null;
        }
        /**
         * A GeoJSON feature collection. Please refer to IETF RFC 7946 for information on the GeoJSON format.
         */
        export interface ZoneCollectionGeoJson {
            "@context"?: JsonLdContext;
            type: "FeatureCollection";
            features: /* A GeoJSON feature. Please refer to IETF RFC 7946 for information on the GeoJSON format. */ GeoJsonFeature[];
        }
        export interface ZoneCollectionJsonLd {
            "@context"?: JsonLdContext;
            "@graph"?: Zone[];
        }
        /**
         * An object representing a zone area forecast.
         */
        export interface ZoneForecast {
            "@context"?: JsonLdContext;
            geometry?: /* A geometry represented in Well-Known Text (WKT) format. */ GeometryString /* wkt */;
            /**
             * An API link to the zone this forecast is for.
             */
            zone?: string; // uri
            /**
             * The time this zone forecast product was published.
             */
            updated?: string; // date-time
            /**
             * An array of forecast periods.
             */
            periods?: {
                /**
                 * A sequential identifier number.
                 */
                number: number;
                /**
                 * A textual description of the period.
                 * example:
                 * This Afternoon
                 */
                name: string;
                /**
                 * A detailed textual forecast for the period.
                 */
                detailedForecast: string;
            }[];
        }
        /**
         * A GeoJSON feature. Please refer to IETF RFC 7946 for information on the GeoJSON format.
         */
        export interface ZoneForecastGeoJson {
            "@context"?: JsonLdContext;
            id?: string; // uri
            type: "Feature";
            geometry: /* A GeoJSON geometry object. Please refer to IETF RFC 7946 for information on the GeoJSON format. */ GeoJsonGeometry;
            properties: /* An object representing a zone area forecast. */ ZoneForecast;
        }
        export type ZoneForecastJsonLd = /* An object representing a zone area forecast. */ ZoneForecast;
        /**
         * A GeoJSON feature. Please refer to IETF RFC 7946 for information on the GeoJSON format.
         */
        export interface ZoneGeoJson {
            "@context"?: JsonLdContext;
            id?: string; // uri
            type: "Feature";
            geometry: /* A GeoJSON geometry object. Please refer to IETF RFC 7946 for information on the GeoJSON format. */ GeoJsonGeometry;
            properties: Zone;
        }
        export type ZoneJsonLd = Zone;
    }
}
declare namespace Paths {
    namespace AlertsActive {
        namespace Parameters {
            export type $0 = Components.Parameters.AlertStatus;
            export type $1 = Components.Parameters.AlertMessageType;
            export type $10 = Components.Parameters.AlertSeverity;
            export type $11 = Components.Parameters.AlertCertainty;
            export type $12 = Components.Parameters.Limit;
            export type $2 = Components.Parameters.AlertEventName;
            export type $3 = Components.Parameters.AlertCode;
            export type $4 = Components.Parameters.AlertArea;
            export type $5 = Components.Parameters.AlertPoint;
            export type $6 = Components.Parameters.AlertRegion;
            export type $7 = Components.Parameters.AlertRegionType;
            export type $8 = Components.Parameters.AlertZone;
            export type $9 = Components.Parameters.AlertUrgency;
        }
        namespace Responses {
            export type $200 = Components.Responses.AlertCollection;
            export interface $301 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace AlertsActiveArea {
        namespace Parameters {
            export type Area = /* State/territory codes and marine area codes */ Components.Schemas.AreaCode;
        }
        export interface PathParameters {
            area: Parameters.Area;
        }
        namespace Responses {
            export type $200 = Components.Responses.AlertCollection;
            export type Default = Components.Responses.Error;
        }
    }
    namespace AlertsActiveCount {
        namespace Responses {
            export interface $200 {
                /**
                 * The total number of active alerts
                 */
                total?: number;
                /**
                 * The total number of active alerts affecting land zones
                 */
                land?: number;
                /**
                 * The total number of active alerts affecting marine zones
                 */
                marine?: number;
                /**
                 * Active alerts by marine region
                 */
                regions?: {
                    [name: string]: number;
                };
                /**
                 * Active alerts by area (state/territory)
                 */
                areas?: {
                    [name: string]: number;
                };
                /**
                 * Active alerts by NWS public zone or county code
                 */
                zones?: {
                    [name: string]: number;
                };
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace AlertsActiveRegion {
        namespace Parameters {
            export type Region = /**
             * Marine region code. These are groups of marine areas combined.
             * * AL: Alaska waters (PK)
             * * AT: Atlantic Ocean (AM, AN)
             * * GL: Great Lakes (LC, LE, LH, LM, LO, LS, SL)
             * * GM: Gulf of Mexico (GM)
             * * PA: Eastern Pacific Ocean and U.S. West Coast (PZ)
             * * PI: Central and Western Pacific (PH, PM, PS)
             *
             */
            Components.Schemas.MarineRegionCode;
        }
        export interface PathParameters {
            region: Parameters.Region;
        }
        namespace Responses {
            export type $200 = Components.Responses.AlertCollection;
            export type Default = Components.Responses.Error;
        }
    }
    namespace AlertsActiveZone {
        namespace Parameters {
            export type $0 = Components.Parameters.NWSZoneId;
        }
        namespace Responses {
            export type $200 = Components.Responses.AlertCollection;
            export type Default = Components.Responses.Error;
        }
    }
    namespace AlertsQuery {
        namespace Parameters {
            export type $1 = Components.Parameters.QueryStartTime /* date-time */;
            export type $10 = Components.Parameters.AlertRegionType;
            export type $11 = Components.Parameters.AlertZone;
            export type $12 = Components.Parameters.AlertUrgency;
            export type $13 = Components.Parameters.AlertSeverity;
            export type $14 = Components.Parameters.AlertCertainty;
            export type $15 = Components.Parameters.Limit;
            export type $16 = Components.Parameters.PaginationCursor;
            export type $2 = Components.Parameters.QueryEndTime /* date-time */;
            export type $3 = Components.Parameters.AlertStatus;
            export type $4 = Components.Parameters.AlertMessageType;
            export type $5 = Components.Parameters.AlertEventName;
            export type $6 = Components.Parameters.AlertCode;
            export type $7 = Components.Parameters.AlertArea;
            export type $8 = Components.Parameters.AlertPoint;
            export type $9 = Components.Parameters.AlertRegion;
            export type Active = boolean;
        }
        export interface QueryParameters {
            active?: Parameters.Active;
        }
        namespace Responses {
            export type $200 = Components.Responses.AlertCollection;
            export interface $301 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace AlertsSingle {
        namespace Parameters {
            export type Id = /* The identifier of the alert message. */ Components.Schemas.AlertId;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = /* A GeoJSON feature. Please refer to IETF RFC 7946 for information on the GeoJSON format. */ Components.Schemas.AlertGeoJson;
            export type Default = Components.Responses.Error;
        }
    }
    namespace AlertsTypes {
        namespace Responses {
            export interface $200 {
                /**
                 * A list of recognized event types
                 */
                eventTypes?: string[];
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace Glossary {
        namespace Responses {
            export interface $200 {
                "@context"?: Components.Schemas.JsonLdContext;
                /**
                 * A list of glossary terms
                 */
                glossary?: {
                    /**
                     * The term being defined
                     */
                    term?: string;
                    /**
                     * A definition for the term
                     */
                    definition?: string;
                }[];
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace Gridpoint {
        namespace Parameters {
            export type $0 = Components.Parameters.GridpointWFO;
            export type $1 = Components.Parameters.GridpointX;
            export type $2 = Components.Parameters.GridpointY;
        }
        namespace Responses {
            export type $200 = /* A GeoJSON feature. Please refer to IETF RFC 7946 for information on the GeoJSON format. */ Components.Schemas.GridpointGeoJson;
            export type Default = Components.Responses.Error;
        }
    }
    namespace GridpointForecast {
        namespace Parameters {
            export type $0 = Components.Parameters.GridpointWFO;
            export type $1 = Components.Parameters.GridpointX;
            export type $2 = Components.Parameters.GridpointY;
            export type $3 = Components.Parameters.GridpointForecastFeatureFlags;
            export type $4 = Components.Parameters.GridpointForecastUnits;
        }
        namespace Responses {
            export type $200 = Components.Responses.GridpointForecast;
            export type Default = Components.Responses.Error;
        }
    }
    namespace GridpointForecastHourly {
        namespace Parameters {
            export type $0 = Components.Parameters.GridpointWFO;
            export type $1 = Components.Parameters.GridpointX;
            export type $2 = Components.Parameters.GridpointY;
            export type $3 = Components.Parameters.GridpointForecastFeatureFlags;
            export type $4 = Components.Parameters.GridpointForecastUnits;
        }
        namespace Responses {
            export type $200 = Components.Responses.GridpointForecast;
            export type Default = Components.Responses.Error;
        }
    }
    namespace GridpointStations {
        namespace Parameters {
            export type $0 = Components.Parameters.GridpointWFO;
            export type $1 = Components.Parameters.GridpointX;
            export type $2 = Components.Parameters.GridpointY;
        }
        namespace Responses {
            export type $200 = Components.Responses.ObservationStationCollection;
            export type Default = Components.Responses.Error;
        }
    }
    namespace Icons {
        namespace Parameters {
            export type First = string;
            export type Fontsize = number;
            export type Set = string;
            export type Size = ("small" | "medium" | "large") | number;
            export type TimeOfDay = string;
        }
        export interface PathParameters {
            set: Parameters.Set;
            timeOfDay: Parameters.TimeOfDay;
            first: Parameters.First;
        }
        export interface QueryParameters {
            size?: Parameters.Size;
            fontsize?: Parameters.Fontsize;
        }
        namespace Responses {
            export type Default = Components.Responses.Error;
        }
    }
    namespace IconsDualCondition {
        namespace Parameters {
            export type First = string;
            export type Fontsize = number;
            export type Second = string;
            export type Set = string;
            export type Size = ("small" | "medium" | "large") | number;
            export type TimeOfDay = string;
        }
        export interface PathParameters {
            set: Parameters.Set;
            timeOfDay: Parameters.TimeOfDay;
            first: Parameters.First;
            second: Parameters.Second;
        }
        export interface QueryParameters {
            size?: Parameters.Size;
            fontsize?: Parameters.Fontsize;
        }
        namespace Responses {
            export type Default = Components.Responses.Error;
        }
    }
    namespace IconsSummary {
        namespace Responses {
            export interface $200 {
                "@context"?: Components.Schemas.JsonLdContext;
                icons: {
                    [name: string]: {
                        description: string;
                    };
                };
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace LocationProducts {
        namespace Parameters {
            export type LocationId = string;
        }
        export interface PathParameters {
            locationId: Parameters.LocationId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.TextProductTypeCollection;
            export type Default = Components.Responses.Error;
        }
    }
    namespace ObsStation {
        namespace Parameters {
            export type $0 = Components.Parameters.ObservationStationId;
        }
        namespace Responses {
            export type $200 = /* A GeoJSON feature. Please refer to IETF RFC 7946 for information on the GeoJSON format. */ Components.Schemas.ObservationStationGeoJson;
            export type Default = Components.Responses.Error;
        }
    }
    namespace ObsStations {
        namespace Parameters {
            export type Id = string[];
            export type Limit = number;
            export type State = /* State/territory codes and marine area codes */ Components.Schemas.AreaCode[];
        }
        export interface QueryParameters {
            id?: Parameters.Id;
            state?: Parameters.State;
            limit?: Parameters.Limit;
        }
        namespace Responses {
            export type $200 = Components.Responses.ObservationStationCollection;
            export type Default = Components.Responses.Error;
        }
    }
    namespace Office {
        namespace Parameters {
            export type $0 = Components.Parameters.NWSForecastOfficeId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Office;
            export type Default = Components.Responses.Error;
        }
    }
    namespace OfficeHeadline {
        namespace Parameters {
            export type $0 = Components.Parameters.NWSForecastOfficeId;
            export type HeadlineId = string;
        }
        export interface PathParameters {
            headlineId: Parameters.HeadlineId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.OfficeHeadline;
            export type Default = Components.Responses.Error;
        }
    }
    namespace OfficeHeadlines {
        namespace Parameters {
            export type $0 = Components.Parameters.NWSForecastOfficeId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.OfficeHeadlineCollection;
            export type Default = Components.Responses.Error;
        }
    }
    namespace Point {
        namespace Parameters {
            export type $0 = Components.Parameters.PathPoint;
        }
        namespace Responses {
            export type $200 = /* A GeoJSON feature. Please refer to IETF RFC 7946 for information on the GeoJSON format. */ Components.Schemas.PointGeoJson;
            export type Default = Components.Responses.Error;
        }
    }
    namespace PointStations {
        namespace Parameters {
            export type $0 = Components.Parameters.PathPoint;
        }
        namespace Responses {
            export interface $301 {
            }
            export type Default = Components.Responses.Error;
        }
    }
    namespace Product {
        namespace Parameters {
            export type ProductId = string;
        }
        export interface PathParameters {
            productId: Parameters.ProductId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.TextProduct;
            export type Default = Components.Responses.Error;
        }
    }
    namespace ProductLocations {
        namespace Responses {
            export type $200 = Components.Schemas.TextProductLocationCollection;
            export type Default = Components.Responses.Error;
        }
    }
    namespace ProductTypes {
        namespace Responses {
            export type $200 = Components.Schemas.TextProductTypeCollection;
            export type Default = Components.Responses.Error;
        }
    }
    namespace ProductsQuery {
        namespace Parameters {
            export type End = string; // date-time
            export type Limit = number;
            export type Location = string[];
            export type Office = string /* ^[A-Z]{4}$ */[];
            export type Start = string; // date-time
            export type Type = string /* ^\w{3}$ */[];
            export type Wmoid = string /* ^[A-Z]{4}\d{2}$ */[];
        }
        export interface QueryParameters {
            location?: Parameters.Location;
            start?: Parameters.Start /* date-time */;
            end?: Parameters.End /* date-time */;
            office?: Parameters.Office;
            wmoid?: Parameters.Wmoid;
            type?: Parameters.Type;
            limit?: Parameters.Limit;
        }
        namespace Responses {
            export type $200 = Components.Schemas.TextProductCollection;
            export type Default = Components.Responses.Error;
        }
    }
    namespace ProductsType {
        namespace Parameters {
            export type TypeId = string;
        }
        export interface PathParameters {
            typeId: Parameters.TypeId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.TextProductCollection;
            export type Default = Components.Responses.Error;
        }
    }
    namespace ProductsTypeLocation {
        namespace Parameters {
            export type LocationId = string;
            export type TypeId = string;
        }
        export interface PathParameters {
            typeId: Parameters.TypeId;
            locationId: Parameters.LocationId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.TextProductCollection;
            export type Default = Components.Responses.Error;
        }
    }
    namespace ProductsTypeLocations {
        namespace Parameters {
            export type TypeId = string;
        }
        export interface PathParameters {
            typeId: Parameters.TypeId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.TextProductLocationCollection;
            export type Default = Components.Responses.Error;
        }
    }
    namespace RadarProfiler {
        namespace Parameters {
            export type Interval = /**
             * A time duration in ISO 8601 format.
             * example:
             * P2DT12H
             */
            Components.Schemas.ISO8601Duration /* ^P(\d+Y)?(\d+M)?(\d+D)?(T(\d+H)?(\d+M)?(\d+S)?)?$ */;
            export type StationId = string;
            export type Time = /**
             * A time interval in ISO 8601 format. This can be one of:
             *
             *     1. Start and end time
             *     2. Start time and duration
             *     3. Duration and end time
             * The string "NOW" can also be used in place of a start/end time.
             *
             */
            Components.Schemas.ISO8601Interval;
        }
        export interface PathParameters {
            stationId: Parameters.StationId;
        }
        export interface QueryParameters {
            time?: Parameters.Time;
            interval?: Parameters.Interval;
        }
        namespace Responses {
            export type $200 = any;
            export type Default = Components.Responses.Error;
        }
    }
    namespace RadarQueue {
        namespace Parameters {
            export type Arrived = /**
             * A time interval in ISO 8601 format. This can be one of:
             *
             *     1. Start and end time
             *     2. Start time and duration
             *     3. Duration and end time
             * The string "NOW" can also be used in place of a start/end time.
             *
             */
            Components.Schemas.ISO8601Interval;
            export type Created = /**
             * A time interval in ISO 8601 format. This can be one of:
             *
             *     1. Start and end time
             *     2. Start time and duration
             *     3. Duration and end time
             * The string "NOW" can also be used in place of a start/end time.
             *
             */
            Components.Schemas.ISO8601Interval;
            export type Feed = string;
            export type Host = string;
            export type Limit = number;
            export type Published = /**
             * A time interval in ISO 8601 format. This can be one of:
             *
             *     1. Start and end time
             *     2. Start time and duration
             *     3. Duration and end time
             * The string "NOW" can also be used in place of a start/end time.
             *
             */
            Components.Schemas.ISO8601Interval;
            export type Resolution = number;
            export type Station = string;
            export type Type = string;
        }
        export interface PathParameters {
            host: Parameters.Host;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            arrived?: Parameters.Arrived;
            created?: Parameters.Created;
            published?: Parameters.Published;
            station?: Parameters.Station;
            type?: Parameters.Type;
            feed?: Parameters.Feed;
            resolution?: Parameters.Resolution;
        }
        namespace Responses {
            export type $200 = any;
            export type Default = Components.Responses.Error;
        }
    }
    namespace RadarServer {
        namespace Parameters {
            export type Id = string;
            export type ReportingHost = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            reportingHost?: Parameters.ReportingHost;
        }
        namespace Responses {
            export type $200 = any;
            export type Default = Components.Responses.Error;
        }
    }
    namespace RadarServers {
        namespace Parameters {
            export type ReportingHost = string;
        }
        export interface QueryParameters {
            reportingHost?: Parameters.ReportingHost;
        }
        namespace Responses {
            export type $200 = any;
            export type Default = Components.Responses.Error;
        }
    }
    namespace RadarStation {
        namespace Parameters {
            export type Host = string;
            export type ReportingHost = string;
            export type StationId = string;
        }
        export interface PathParameters {
            stationId: Parameters.StationId;
        }
        export interface QueryParameters {
            reportingHost?: Parameters.ReportingHost;
            host?: Parameters.Host;
        }
        namespace Responses {
            export type $200 = any;
            export type Default = Components.Responses.Error;
        }
    }
    namespace RadarStationAlarms {
        namespace Parameters {
            export type StationId = string;
        }
        export interface PathParameters {
            stationId: Parameters.StationId;
        }
        namespace Responses {
            export type $200 = any;
            export type Default = Components.Responses.Error;
        }
    }
    namespace RadarStations {
        namespace Parameters {
            export type Host = string;
            export type ReportingHost = string;
            export type StationType = string /* ^[A-Za-z0-9-]+$ */[];
        }
        export interface QueryParameters {
            stationType?: Parameters.StationType;
            reportingHost?: Parameters.ReportingHost;
            host?: Parameters.Host;
        }
        namespace Responses {
            export type $200 = any;
            export type Default = Components.Responses.Error;
        }
    }
    namespace SatelliteThumbnails {
        namespace Parameters {
            export type Area = "a" | "e" | "g" | "h" | "p" | "s" | "w";
        }
        export interface PathParameters {
            area: Parameters.Area;
        }
        namespace Responses {
            export type Default = Components.Responses.Error;
        }
    }
    namespace StationObservationLatest {
        namespace Parameters {
            export type $0 = Components.Parameters.ObservationStationId;
            export type RequireQc = boolean;
        }
        export interface QueryParameters {
            require_qc?: Parameters.RequireQc;
        }
        namespace Responses {
            export type $200 = Components.Responses.Observation;
            export type Default = Components.Responses.Error;
        }
    }
    namespace StationObservationList {
        namespace Parameters {
            export type $0 = Components.Parameters.ObservationStationId;
            export type $1 = Components.Parameters.QueryStartTime /* date-time */;
            export type $2 = Components.Parameters.QueryEndTime /* date-time */;
            export type Limit = number;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
        }
        namespace Responses {
            export type $200 = Components.Responses.ObservationCollection;
            export type Default = Components.Responses.Error;
        }
    }
    namespace StationObservationTime {
        namespace Parameters {
            export type $0 = Components.Parameters.ObservationStationId;
            export type Time = string; // date-time
        }
        export interface PathParameters {
            time: Parameters.Time /* date-time */;
        }
        namespace Responses {
            export type $200 = Components.Responses.Observation;
            export type Default = Components.Responses.Error;
        }
    }
    namespace Zone {
        namespace Parameters {
            export type $1 = Components.Parameters.NWSZoneId;
            export type Effective = string; // date-time
            export type Type = "forecast" | "county" | "fire";
        }
        export interface PathParameters {
            type: Parameters.Type;
        }
        export interface QueryParameters {
            effective?: Parameters.Effective /* date-time */;
        }
        namespace Responses {
            export type $200 = /* A GeoJSON feature. Please refer to IETF RFC 7946 for information on the GeoJSON format. */ Components.Schemas.ZoneGeoJson;
            export type Default = Components.Responses.Error;
        }
    }
    namespace ZoneForecast {
        namespace Parameters {
            export type $1 = Components.Parameters.NWSZoneId;
            export type Type = string;
        }
        export interface PathParameters {
            type: Parameters.Type;
        }
        namespace Responses {
            export type $200 = /* A GeoJSON feature. Please refer to IETF RFC 7946 for information on the GeoJSON format. */ Components.Schemas.ZoneForecastGeoJson;
            export type Default = Components.Responses.Error;
        }
    }
    namespace ZoneList {
        namespace Parameters {
            export type Area = /* State/territory codes and marine area codes */ Components.Schemas.AreaCode[];
            export type Effective = string; // date-time
            export type Id = /**
             * UGC identifier for a NWS forecast zone or county.
             * The first two letters will correspond to either a state code or marine area code (see #/components/schemas/StateTerritoryCode and #/components/schemas/MarineAreaCode for lists of valid letter combinations).
             * The third letter will be Z for public/fire zone or C for county.
             *
             */
            Components.Schemas.NWSZoneID /* ^(A[KLMNRSZ]|C[AOT]|D[CE]|FL|G[AMU]|I[ADLN]|K[SY]|L[ACEHMOS]|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AHKMRSZ]|S[CDL]|T[NX]|UT|V[AIT]|W[AIVY]|[HR]I)[CZ]\d{3}$ */[];
            export type IncludeGeometry = boolean;
            export type Limit = number;
            export type Point = Components.Schemas.PointString /* ^(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)$ */;
            export type Region = Components.Schemas.RegionCode[];
            export type Type = ("land" | "marine" | "forecast" | "public" | "coastal" | "offshore" | "fire" | "county")[];
        }
        export interface QueryParameters {
            id?: Parameters.Id;
            area?: Parameters.Area;
            region?: Parameters.Region;
            type?: Parameters.Type;
            point?: Parameters.Point;
            include_geometry?: Parameters.IncludeGeometry;
            limit?: Parameters.Limit;
            effective?: Parameters.Effective /* date-time */;
        }
        namespace Responses {
            export type $200 = /* A GeoJSON feature collection. Please refer to IETF RFC 7946 for information on the GeoJSON format. */ Components.Schemas.ZoneCollectionGeoJson;
            export type Default = Components.Responses.Error;
        }
    }
    namespace ZoneListType {
        namespace Parameters {
            export type Area = /* State/territory codes and marine area codes */ Components.Schemas.AreaCode[];
            export type Effective = string; // date-time
            export type Id = /**
             * UGC identifier for a NWS forecast zone or county.
             * The first two letters will correspond to either a state code or marine area code (see #/components/schemas/StateTerritoryCode and #/components/schemas/MarineAreaCode for lists of valid letter combinations).
             * The third letter will be Z for public/fire zone or C for county.
             *
             */
            Components.Schemas.NWSZoneID /* ^(A[KLMNRSZ]|C[AOT]|D[CE]|FL|G[AMU]|I[ADLN]|K[SY]|L[ACEHMOS]|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AHKMRSZ]|S[CDL]|T[NX]|UT|V[AIT]|W[AIVY]|[HR]I)[CZ]\d{3}$ */[];
            export type IncludeGeometry = boolean;
            export type Limit = number;
            export type Point = Components.Schemas.PointString /* ^(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)$ */;
            export type Region = Components.Schemas.RegionCode[];
            export type Type = "land" | "marine" | "forecast" | "public" | "coastal" | "offshore" | "fire" | "county";
        }
        export interface PathParameters {
            type: Parameters.Type;
        }
        export interface QueryParameters {
            id?: Parameters.Id;
            area?: Parameters.Area;
            region?: Parameters.Region;
            type?: Parameters.Type;
            point?: Parameters.Point;
            include_geometry?: Parameters.IncludeGeometry;
            limit?: Parameters.Limit;
            effective?: Parameters.Effective /* date-time */;
        }
        namespace Responses {
            export type $200 = /* A GeoJSON feature collection. Please refer to IETF RFC 7946 for information on the GeoJSON format. */ Components.Schemas.ZoneCollectionGeoJson;
            export type Default = Components.Responses.Error;
        }
    }
    namespace ZoneObs {
        namespace Parameters {
            export type $0 = Components.Parameters.NWSZoneId;
            export type End = string; // date-time
            export type Limit = number;
            export type Start = string; // date-time
        }
        export interface QueryParameters {
            start?: Parameters.Start /* date-time */;
            end?: Parameters.End /* date-time */;
            limit?: Parameters.Limit;
        }
        namespace Responses {
            export type $200 = /* A GeoJSON feature collection. Please refer to IETF RFC 7946 for information on the GeoJSON format. */ Components.Schemas.ObservationCollectionGeoJson;
            export type Default = Components.Responses.Error;
        }
    }
    namespace ZoneStations {
        namespace Parameters {
            export type $0 = Components.Parameters.NWSZoneId;
        }
        namespace Responses {
            export type $200 = Components.Responses.ObservationStationCollection;
            export type Default = Components.Responses.Error;
        }
    }
}
