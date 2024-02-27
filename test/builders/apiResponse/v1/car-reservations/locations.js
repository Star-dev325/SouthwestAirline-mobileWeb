export default class Locations {
  constructor() {
    this.locations = [{
      airport: { code: 'ABR', airportName: 'Aberdeen, SD - ABR' },
      city: 'Aberdeen',
      state: 'SD'
    }, {
      airport: { code: 'ABI', airportName: 'Abilene, TX - ABI' },
      city: 'Abilene',
      state: 'TX'
    }, {
      airport: { code: 'ACA', airportName: 'Acapulco, Guerrero - ACA' },
      city: 'Acapulco',
      state: 'Guerrero'
    }, {
      airport: {
        code: 'AGU',
        airportName: 'Aguascalientes, Aguascalientes - AGU'
      },
      city: 'Aguascalientes',
      state: 'Aguascalientes'
    }, {
      airport: { code: 'CAK', airportName: 'Akron-Canton, OH - CAK' },
      city: 'Akron-Canton',
      state: 'OH'
    }, {
      airport: { code: 'ALM', airportName: 'Alamogordo, NM - ALM' },
      city: 'Alamogordo',
      state: 'NM'
    }, {
      airport: { code: 'ABY', airportName: 'Albany, GA - ABY' },
      city: 'Albany',
      state: 'GA'
    }, {
      airport: { code: 'ALB', airportName: 'Albany, NY - ALB' },
      city: 'Albany',
      state: 'NY'
    }, {
      airport: { code: 'ABQ', airportName: 'Albuquerque, NM - ABQ' },
      city: 'Albuquerque',
      state: 'NM'
    }, {
      airport: { code: 'AEX', airportName: 'Alexandria, LA - AEX' },
      city: 'Alexandria',
      state: 'LA'
    }, {
      airport: { code: 'AXA', airportName: 'Algona, IA - AXA' },
      city: 'Algona',
      state: 'IA'
    }, {
      airport: { code: 'ABE', airportName: 'Allentown, PA - ABE' },
      city: 'Allentown',
      state: 'PA'
    }, {
      airport: { code: 'APN', airportName: 'Alpena, MI - APN' },
      city: 'Alpena',
      state: 'MI'
    }, {
      airport: { code: 'AMA', airportName: 'Amarillo, TX - AMA' },
      city: 'Amarillo',
      state: 'TX'
    }, {
      airport: { code: 'ANA', airportName: 'Anaheim/Disneyland, CA - ANA' },
      city: 'Anaheim/Disneyland',
      state: 'CA'
    }, {
      airport: { code: 'ANC', airportName: 'Anchorage, AK - ANC' },
      city: 'Anchorage',
      state: 'AK'
    }, {
      airport: { code: 'ARB', airportName: 'Ann Arbor, MI - ARB' },
      city: 'Ann Arbor',
      state: 'MI'
    }, {
      airport: { code: 'ANB', airportName: 'Anniston, AL - ANB' },
      city: 'Anniston',
      state: 'AL'
    }, {
      airport: { code: 'ATW', airportName: 'Appleton, WI - ATW' },
      city: 'Appleton',
      state: 'WI'
    }, {
      airport: { code: 'ACV', airportName: 'Arcata/Eureka, CA - ACV' },
      city: 'Arcata/Eureka',
      state: 'CA'
    }, {
      airport: { code: 'AUA', airportName: 'Aruba, Aruba - AUA' },
      city: 'Aruba',
      state: 'Aruba'
    }, {
      airport: { code: 'AVL', airportName: 'Asheville, NC - AVL' },
      city: 'Asheville',
      state: 'NC'
    }, {
      airport: { code: 'ASE', airportName: 'Aspen, CO - ASE' },
      city: 'Aspen',
      state: 'CO'
    }, {
      airport: { code: 'AHN', airportName: 'Athens, GA - AHN' },
      city: 'Athens',
      state: 'GA'
    }, {
      airport: { code: 'ATL', airportName: 'Atlanta, GA - ATL' },
      city: 'Atlanta',
      state: 'GA'
    }, {
      airport: { code: 'PDK', airportName: 'Atlanta, GA - PDK' },
      city: 'Atlanta',
      state: 'GA'
    }, {
      airport: { code: 'ACY', airportName: 'Atlantic City, NJ - ACY' },
      city: 'Atlantic City',
      state: 'NJ'
    }, {
      airport: { code: 'AGS', airportName: 'Augusta, GA - AGS' },
      city: 'Augusta',
      state: 'GA'
    }, {
      airport: { code: 'AUG', airportName: 'Augusta, ME - AUG' },
      city: 'Augusta',
      state: 'ME'
    }, {
      airport: { code: 'AUH', airportName: 'Aurora, NE - AUH' },
      city: 'Aurora',
      state: 'NE'
    }, {
      airport: { code: 'AUS', airportName: 'Austin, TX - AUS' },
      city: 'Austin',
      state: 'TX'
    }, {
      airport: { code: 'BFL', airportName: 'Bakersfield, CA - BFL' },
      city: 'Bakersfield',
      state: 'CA'
    }, {
      airport: { code: 'BWI', airportName: 'Baltimore/Washington, MD - BWI' },
      city: 'Baltimore/Washington',
      state: 'MD'
    }, {
      airport: { code: 'BGR', airportName: 'Bangor, ME - BGR' },
      city: 'Bangor',
      state: 'ME'
    }, {
      airport: { code: 'BHB', airportName: 'Bar Harbor, ME - BHB' },
      city: 'Bar Harbor',
      state: 'ME'
    }, {
      airport: { code: 'BVO', airportName: 'Bartlesville, OK - BVO' },
      city: 'Bartlesville',
      state: 'OK'
    }, {
      airport: { code: 'BTR', airportName: 'Baton Rouge, LA - BTR' },
      city: 'Baton Rouge',
      state: 'LA'
    }, {
      airport: { code: 'BPT', airportName: 'Beaumont/Port Arthur, TX - BPT' },
      city: 'Beaumont/Port Arthur',
      state: 'TX'
    }, {
      airport: { code: 'BKW', airportName: 'Beckley, WV - BKW' },
      city: 'Beckley',
      state: 'WV'
    }, {
      airport: { code: 'BED', airportName: 'Bedford, MA - BED' },
      city: 'Bedford',
      state: 'MA'
    }, {
      airport: { code: 'BZE', airportName: 'Belize City, Belize - BZE' },
      city: 'Belize City',
      state: 'Belize'
    }, {
      airport: { code: 'BLI', airportName: 'Bellingham, WA - BLI' },
      city: 'Bellingham',
      state: 'WA'
    }, {
      airport: { code: 'BJI', airportName: 'Bemidji, MN - BJI' },
      city: 'Bemidji',
      state: 'MN'
    }, {
      airport: { code: 'BIL', airportName: 'Billings, MT - BIL' },
      city: 'Billings',
      state: 'MT'
    }, {
      airport: { code: 'BGM', airportName: 'Binghamton, NY - BGM' },
      city: 'Binghamton',
      state: 'NY'
    }, {
      airport: { code: 'BHM', airportName: 'Birmingham, AL - BHM' },
      city: 'Birmingham',
      state: 'AL'
    }, {
      airport: { code: 'BIS', airportName: 'Bismarck, ND - BIS' },
      city: 'Bismarck',
      state: 'ND'
    }, {
      airport: { code: 'BMG', airportName: 'Bloomington, IN - BMG' },
      city: 'Bloomington',
      state: 'IN'
    }, {
      airport: { code: 'BMI', airportName: 'Bloomington/Normal, IL - BMI' },
      city: 'Bloomington/Normal',
      state: 'IL'
    }, {
      airport: { code: 'BOI', airportName: 'Boise, ID - BOI' },
      city: 'Boise',
      state: 'ID'
    }, {
      airport: { code: 'VER', airportName: 'Boonville, MO - VER' },
      city: 'Boonville',
      state: 'MO'
    }, {
      airport: { code: 'BOS', airportName: 'Boston Logan, MA - BOS' },
      city: 'Boston Logan',
      state: 'MA'
    }, {
      airport: { code: 'BZN', airportName: 'Bozeman, MT - BZN' },
      city: 'Bozeman',
      state: 'MT'
    }, {
      airport: { code: 'BRD', airportName: 'Brainerd, MN - BRD' },
      city: 'Brainerd',
      state: 'MN'
    }, {
      airport: { code: 'BKG', airportName: 'Branson, MO - BKG' },
      city: 'Branson',
      state: 'MO'
    }, {
      airport: {
        code: 'TRI',
        airportName: 'Bristol/Johnson City/Kingsport, TN - TRI'
      },
      city: 'Bristol/Johnson City/Kingsport',
      state: 'TN'
    }, {
      airport: { code: 'BRO', airportName: 'Brownsville, TX - BRO' },
      city: 'Brownsville',
      state: 'TX'
    }, {
      airport: { code: 'BQK', airportName: 'Brunswick, GA - BQK' },
      city: 'Brunswick',
      state: 'GA'
    }, {
      airport: { code: 'SSI', airportName: 'Brunswick, GA - SSI' },
      city: 'Brunswick',
      state: 'GA'
    }, {
      airport: { code: 'BUF', airportName: 'Buffalo/Niagara, NY - BUF' },
      city: 'Buffalo/Niagara',
      state: 'NY'
    }, {
      airport: { code: 'IFP', airportName: 'Bullhead City, AZ - IFP' },
      city: 'Bullhead City',
      state: 'AZ'
    }, {
      airport: { code: 'BUR', airportName: 'Burbank, CA - BUR' },
      city: 'Burbank',
      state: 'CA'
    }, {
      airport: { code: 'BRL', airportName: 'Burlington, IA - BRL' },
      city: 'Burlington',
      state: 'IA'
    }, {
      airport: { code: 'BTV', airportName: 'Burlington, VT - BTV' },
      city: 'Burlington',
      state: 'VT'
    }, {
      airport: { code: 'BTM', airportName: 'Butte, MT - BTM' },
      city: 'Butte',
      state: 'MT'
    }, {
      airport: {
        code: 'SJD',
        airportName: 'Cabo San Lucas/Los Cabos, MX - SJD'
      },
      city: 'Cabo San Lucas/Los Cabos',
      state: 'MX'
    }, {
      airport: { code: 'YYC', airportName: 'Calgary Airport, AB - YYC' },
      city: 'Calgary Airport',
      state: 'AB'
    }, {
      airport: { code: 'ADW', airportName: 'Camp Springs, MD - ADW' },
      city: 'Camp Springs',
      state: 'MD'
    }, {
      airport: { code: 'CUN', airportName: 'Cancun, Mexico - CUN' },
      city: 'Cancun',
      state: 'Mexico'
    }, {
      airport: {
        code: 'VSA',
        airportName: 'Capitan Carlos Rovirosa, MX - VSA'
      },
      city: 'Capitan Carlos Rovirosa',
      state: 'MX'
    }, {
      airport: { code: 'CLD', airportName: 'Carlsbad, CA - CLD' },
      city: 'Carlsbad',
      state: 'CA'
    }, {
      airport: { code: 'CPR', airportName: 'Casper, WY - CPR' },
      city: 'Casper',
      state: 'WY'
    }, {
      airport: { code: 'YCG', airportName: 'Castlegar, BC - YCG' },
      city: 'Castlegar',
      state: 'BC'
    }, {
      airport: { code: 'CDC', airportName: 'Cedar City, UT - CDC' },
      city: 'Cedar City',
      state: 'UT'
    }, {
      airport: { code: 'CID', airportName: 'Cedar Rapids, IA - CID' },
      city: 'Cedar Rapids',
      state: 'IA'
    }, {
      airport: { code: 'CMI', airportName: 'Champaign/Urbana, IL - CMI' },
      city: 'Champaign/Urbana',
      state: 'IL'
    }, {
      airport: { code: 'CHS', airportName: 'Charleston, SC - CHS' },
      city: 'Charleston',
      state: 'SC'
    }, {
      airport: { code: 'CRW', airportName: 'Charleston, WV - CRW' },
      city: 'Charleston',
      state: 'WV'
    }, {
      airport: { code: 'CLT', airportName: 'Charlotte, NC - CLT' },
      city: 'Charlotte',
      state: 'NC'
    }, {
      airport: { code: 'CHO', airportName: 'Charlottesville, VA - CHO' },
      city: 'Charlottesville',
      state: 'VA'
    }, {
      airport: { code: 'CHA', airportName: 'Chattanooga, TN - CHA' },
      city: 'Chattanooga',
      state: 'TN'
    }, {
      airport: { code: 'CYS', airportName: 'Cheyenne, WY - CYS' },
      city: 'Cheyenne',
      state: 'WY'
    }, {
      airport: { code: 'MDW', airportName: 'Chicago (Midway), IL - MDW' },
      city: 'Chicago (Midway)',
      state: 'IL'
    }, {
      airport: { code: 'ORD', airportName: 'Chicago O\'Hare, IL -ORD' },
      city: 'Chicago O\'Hare',
      state: 'IL'
    }, {
      airport: { code: 'CUU', airportName: 'Chihuahua, Chihuahua - CUU' },
      city: 'Chihuahua',
      state: 'Chihuahua'
    }, {
      airport: { code: 'LUK', airportName: 'Cincinnati, OH - LUK' },
      city: 'Cincinnati',
      state: 'OH'
    }, {
      airport: { code: 'CKB', airportName: 'Clarksburg, WV - CKB' },
      city: 'Clarksburg',
      state: 'WV'
    }, {
      airport: { code: 'CPT', airportName: 'Cleburne, TX - CPT' },
      city: 'Cleburne',
      state: 'TX'
    }, {
      airport: { code: 'CLE', airportName: 'Cleveland, OH - CLE' },
      city: 'Cleveland',
      state: 'OH'
    }, {
      airport: {
        code: 'BKL',
        airportName: 'Cleveland Burke Airport, OH - BKL'
      },
      city: 'Cleveland Burke Airport',
      state: 'OH'
    }, {
      airport: {
        code: 'CGF',
        airportName: 'Cleveland Cuyahoga Airport, OH - CGF'
      },
      city: 'Cleveland Cuyahoga Airport',
      state: 'OH'
    }, {
      airport: { code: 'COD', airportName: 'Cody, WY - COD' },
      city: 'Cody',
      state: 'WY'
    }, {
      airport: { code: 'COE', airportName: 'Coeur d\'Alene, ID -COE' },
      city: 'Coeur d\'Alene',
      state: 'ID'
    }, {
      airport: { code: 'CLL', airportName: 'College Station, TX - CLL' },
      city: 'College Station',
      state: 'TX'
    }, {
      airport: { code: 'COS', airportName: 'Colorado Springs, CO - COS' },
      city: 'Colorado Springs',
      state: 'CO'
    }, {
      airport: { code: 'CAE', airportName: 'Columbia, SC - CAE' },
      city: 'Columbia',
      state: 'SC'
    }, {
      airport: { code: 'CMH', airportName: 'Columbus, OH - CMH' },
      city: 'Columbus',
      state: 'OH'
    }, {
      airport: { code: 'CSG', airportName: 'Columbus, GA - CSG' },
      city: 'Columbus',
      state: 'GA'
    }, {
      airport: {
        code: 'GTR',
        airportName: 'Columbus/West Point/Starkville, MS - GTR'
      },
      city: 'Columbus/West Point/Starkville',
      state: 'MS'
    }, {
      airport: { code: 'CCR', airportName: 'Concord, CA - CCR' },
      city: 'Concord',
      state: 'CA'
    }, {
      airport: { code: 'CRP', airportName: 'Corpus Christi, TX - CRP' },
      city: 'Corpus Christi',
      state: 'TX'
    }, {
      airport: { code: 'CEZ', airportName: 'Cortez, CO - CEZ' },
      city: 'Cortez',
      state: 'CO'
    }, {
      airport: {
        code: 'CVG',
        airportName: 'Covington KY/Cincinnati, OH - CVG'
      },
      city: 'Covington KY/Cincinnati',
      state: 'OH'
    }, {
      airport: { code: 'CZM', airportName: 'Cozumel, Quintana Roo - CZM' },
      city: 'Cozumel',
      state: 'Quintana Roo'
    }, {
      airport: { code: 'YXC', airportName: 'Cranbrook, BC - YXC' },
      city: 'Cranbrook',
      state: 'BC'
    }, {
      airport: { code: 'CUL', airportName: 'Culiacan, Sinaloa - CUL' },
      city: 'Culiacan',
      state: 'Sinaloa'
    }, {
      airport: {
        code: 'DFW',
        airportName: 'Dallas (Dallas/Ft. Worth), TX - DFW'
      },
      city: 'Dallas (Dallas/Ft. Worth)',
      state: 'TX'
    }, {
      airport: { code: 'DAL', airportName: 'Dallas (Love Field), TX - DAL' },
      city: 'Dallas (Love Field)',
      state: 'TX'
    }, {
      airport: { code: 'DAY', airportName: 'Dayton, OH - DAY' },
      city: 'Dayton',
      state: 'OH'
    }, {
      airport: { code: 'DAB', airportName: 'Daytona Beach, FL - DAB' },
      city: 'Daytona Beach',
      state: 'FL'
    }, {
      airport: { code: 'DEC', airportName: 'Decatur, IL - DEC' },
      city: 'Decatur',
      state: 'IL'
    }, {
      airport: { code: 'DEN', airportName: 'Denver, CO - DEN' },
      city: 'Denver',
      state: 'CO'
    }, {
      airport: { code: 'DSM', airportName: 'Des Moines, IA - DSM' },
      city: 'Des Moines',
      state: 'IA'
    }, {
      airport: { code: 'DTW', airportName: 'Detroit, MI - DTW' },
      city: 'Detroit',
      state: 'MI'
    }, {
      airport: { code: 'DHN', airportName: 'Dothan, AL - DHN' },
      city: 'Dothan',
      state: 'AL'
    }, {
      airport: { code: 'DBQ', airportName: 'Dubuque, IA - DBQ' },
      city: 'Dubuque',
      state: 'IA'
    }, {
      airport: { code: 'DLH', airportName: 'Duluth, MN - DLH' },
      city: 'Duluth',
      state: 'MN'
    }, {
      airport: { code: 'DRO', airportName: 'Durango, CO - DRO' },
      city: 'Durango',
      state: 'CO'
    }, {
      airport: { code: 'EAU', airportName: 'Eau Claire, WI - EAU' },
      city: 'Eau Claire',
      state: 'WI'
    }, {
      airport: { code: 'IPL', airportName: 'El Centro/Imperial, CA - IPL' },
      city: 'El Centro/Imperial',
      state: 'CA'
    }, {
      airport: { code: 'EKO', airportName: 'Elko, NV - EKO' },
      city: 'Elko',
      state: 'NV'
    }, {
      airport: { code: 'ELM', airportName: 'Elmira, NY - ELM' },
      city: 'Elmira',
      state: 'NY'
    }, {
      airport: { code: 'ELP', airportName: 'El Paso, TX - ELP' },
      city: 'El Paso',
      state: 'TX'
    }, {
      airport: { code: 'ERI', airportName: 'Erie, PA - ERI' },
      city: 'Erie',
      state: 'PA'
    }, {
      airport: { code: 'ESC', airportName: 'Escanaba, MI - ESC' },
      city: 'Escanaba',
      state: 'MI'
    }, {
      airport: { code: 'EUG', airportName: 'Eugene, OR - EUG' },
      city: 'Eugene',
      state: 'OR'
    }, {
      airport: { code: 'EVV', airportName: 'Evansville, IN - EVV' },
      city: 'Evansville',
      state: 'IN'
    }, {
      airport: { code: 'FAI', airportName: 'Fairbanks, AK - FAI' },
      city: 'Fairbanks',
      state: 'AK'
    }, {
      airport: { code: 'FAR', airportName: 'Fargo, ND - FAR' },
      city: 'Fargo',
      state: 'ND'
    }, {
      airport: { code: 'FMN', airportName: 'Farmington, NM - FMN' },
      city: 'Farmington',
      state: 'NM'
    }, {
      airport: { code: 'FAY', airportName: 'Fayetteville, NC - FAY' },
      city: 'Fayetteville',
      state: 'NC'
    }, {
      airport: {
        code: 'XNA',
        airportName: 'Fayetteville/Springdale, AR - XNA'
      },
      city: 'Fayetteville/Springdale',
      state: 'AR'
    }, {
      airport: { code: 'FLG', airportName: 'Flagstaff, AZ - FLG' },
      city: 'Flagstaff',
      state: 'AZ'
    }, {
      airport: { code: 'FNT', airportName: 'Flint, MI - FNT' },
      city: 'Flint',
      state: 'MI'
    }, {
      airport: { code: 'FLO', airportName: 'Florence, SC - FLO' },
      city: 'Florence',
      state: 'SC'
    }, {
      airport: { code: 'GRK', airportName: 'Fort Hood (Killeen), TX - GRK' },
      city: 'Fort Hood (Killeen)',
      state: 'TX'
    }, {
      airport: { code: 'TBN', airportName: 'Fort Leonard Wood, MO - TBN' },
      city: 'Fort Leonard Wood',
      state: 'MO'
    }, {
      airport: { code: 'FSM', airportName: 'Fort Smith, AR - FSM' },
      city: 'Fort Smith',
      state: 'AR'
    }, {
      airport: {
        code: 'VPS',
        airportName: 'Fort Walton Beach (Valparaiso), FL - VPS'
      },
      city: 'Fort Walton Beach (Valparaiso)',
      state: 'FL'
    }, {
      airport: { code: 'FWA', airportName: 'Fort Wayne, IN - FWA' },
      city: 'Fort Wayne',
      state: 'IN'
    }, {
      airport: { code: 'FTW', airportName: 'Fort Worth Airport, TX - FTW' },
      city: 'Fort Worth Airport',
      state: 'TX'
    }, {
      airport: { code: 'FAT', airportName: 'Fresno, CA - FAT' },
      city: 'Fresno',
      state: 'CA'
    }, {
      airport: { code: 'FLL', airportName: 'Ft. Lauderdale, FL - FLL' },
      city: 'Ft. Lauderdale',
      state: 'FL'
    }, {
      airport: { code: 'RSW', airportName: 'Ft. Myers, FL - RSW' },
      city: 'Ft. Myers',
      state: 'FL'
    }, {
      airport: { code: 'GAD', airportName: 'Gadsden, AL - GAD' },
      city: 'Gadsden',
      state: 'AL'
    }, {
      airport: { code: 'GNV', airportName: 'Gainesville, FL - GNV' },
      city: 'Gainesville',
      state: 'FL'
    }, {
      airport: { code: 'GUP', airportName: 'Gallup, NM - GUP' },
      city: 'Gallup',
      state: 'NM'
    }, {
      airport: { code: 'REX', airportName: 'Gen Lucio Blanco, MX - REX' },
      city: 'Gen Lucio Blanco',
      state: 'MX'
    }, {
      airport: { code: 'GCC', airportName: 'Gillette, WY - GCC' },
      city: 'Gillette',
      state: 'WY'
    }, {
      airport: { code: 'GCM', airportName: 'Grand Cayman, KY - GCM' },
      city: 'Grand Cayman',
      state: 'KY'
    }, {
      airport: { code: 'GFK', airportName: 'Grand Forks, ND - GFK' },
      city: 'Grand Forks',
      state: 'ND'
    }, {
      airport: { code: 'GRI', airportName: 'Grand Island, NE - GRI' },
      city: 'Grand Island',
      state: 'NE'
    }, {
      airport: { code: 'GJT', airportName: 'Grand Junction, CO - GJT' },
      city: 'Grand Junction',
      state: 'CO'
    }, {
      airport: { code: 'GRR', airportName: 'Grand Rapids, MI - GRR' },
      city: 'Grand Rapids',
      state: 'MI'
    }, {
      airport: { code: 'GTF', airportName: 'Great Falls, MT - GTF' },
      city: 'Great Falls',
      state: 'MT'
    }, {
      airport: { code: 'GRB', airportName: 'Green Bay, WI - GRB' },
      city: 'Green Bay',
      state: 'WI'
    }, {
      airport: { code: 'LWB', airportName: 'Greenbrier (Lewisburg), WV - LWB' },
      city: 'Greenbrier (Lewisburg)',
      state: 'WV'
    }, {
      airport: { code: 'GSO', airportName: 'Greensboro/High Point, NC - GSO' },
      city: 'Greensboro/High Point',
      state: 'NC'
    }, {
      airport: { code: 'GLH', airportName: 'Greenville, MS - GLH' },
      city: 'Greenville',
      state: 'MS'
    }, {
      airport: { code: 'PGV', airportName: 'Greenville, NC - PGV' },
      city: 'Greenville',
      state: 'NC'
    }, {
      airport: { code: 'GSP', airportName: 'Greenville/Spartanburg, SC - GSP' },
      city: 'Greenville/Spartanburg',
      state: 'SC'
    }, {
      airport: { code: 'GON', airportName: 'Groton/New London, CT - GON' },
      city: 'Groton/New London',
      state: 'CT'
    }, {
      airport: { code: 'GDL', airportName: 'Guadalajara, Jalisco - GDL' },
      city: 'Guadalajara',
      state: 'Jalisco'
    }, {
      airport: { code: 'GPT', airportName: 'Gulfport/Biloxi, MS - GPT' },
      city: 'Gulfport/Biloxi',
      state: 'MS'
    }, {
      airport: { code: 'GUC', airportName: 'Gunnison, CO - GUC' },
      city: 'Gunnison',
      state: 'CO'
    }, {
      airport: { code: 'HGR', airportName: 'Hagerstown, MD - HGR' },
      city: 'Hagerstown',
      state: 'MD'
    }, {
      airport: { code: 'CMX', airportName: 'Hancock, MI - CMX' },
      city: 'Hancock',
      state: 'MI'
    }, {
      airport: { code: 'HRL', airportName: 'Harlingen, TX - HRL' },
      city: 'Harlingen',
      state: 'TX'
    }, {
      airport: {
        code: 'MDT',
        airportName: 'Harrisburg (Middletown), PA - MDT'
      },
      city: 'Harrisburg (Middletown)',
      state: 'PA'
    }, {
      airport: { code: 'BDL', airportName: 'Hartford, CT - BDL' },
      city: 'Hartford',
      state: 'CT'
    }, {
      airport: { code: 'HAV', airportName: 'Havana, Cuba - HAV' },
      city: 'Havana',
      state: 'Cuba'
    }, {
      airport: { code: 'HYS', airportName: 'Hays, KS - HYS' },
      city: 'Hays',
      state: 'KS'
    }, {
      airport: { code: 'HLN', airportName: 'Helena, MT - HLN' },
      city: 'Helena',
      state: 'MT'
    }, {
      airport: { code: 'HSH', airportName: 'Henderson, NV - HSH' },
      city: 'Henderson',
      state: 'NV'
    }, {
      airport: { code: 'HMO', airportName: 'Hermosillo, Sonora - HMO' },
      city: 'Hermosillo',
      state: 'Sonora'
    }, {
      airport: { code: 'HKY', airportName: 'Hickory, NC - HKY' },
      city: 'Hickory',
      state: 'NC'
    }, {
      airport: { code: 'ITO', airportName: 'Hilo, HI - ITO' },
      city: 'Hilo',
      state: 'HI'
    }, {
      airport: { code: 'HHH', airportName: 'Hilton Head Island, SC - HHH' },
      city: 'Hilton Head Island',
      state: 'SC'
    }, {
      airport: { code: 'HOB', airportName: 'Hobbs, NM - HOB' },
      city: 'Hobbs',
      state: 'NM'
    }, {
      airport: { code: 'HNL', airportName: 'Honolulu, HI - HNL' },
      city: 'Honolulu',
      state: 'HI'
    }, {
      airport: { code: 'HOT', airportName: 'Hot Springs, AR - HOT' },
      city: 'Hot Springs',
      state: 'AR'
    }, {
      airport: { code: 'HOU', airportName: 'Houston (Hobby), TX - HOU' },
      city: 'Houston (Hobby)',
      state: 'TX'
    }, {
      airport: {
        code: 'IAH',
        airportName: 'Houston Intercontinental, TX - IAH'
      },
      city: 'Houston Intercontinental',
      state: 'TX'
    }, {
      airport: { code: 'HTS', airportName: 'Huntington, WV - HTS' },
      city: 'Huntington',
      state: 'WV'
    }, {
      airport: { code: 'HSV', airportName: 'Huntsville/Decatur, AL - HSV' },
      city: 'Huntsville/Decatur',
      state: 'AL'
    }, {
      airport: { code: 'HYA', airportName: 'Hyannis, MA - HYA' },
      city: 'Hyannis',
      state: 'MA'
    }, {
      airport: { code: 'IDA', airportName: 'Idaho Falls, ID - IDA' },
      city: 'Idaho Falls',
      state: 'ID'
    }, {
      airport: { code: 'IND', airportName: 'Indianapolis, IN - IND' },
      city: 'Indianapolis',
      state: 'IN'
    }, {
      airport: { code: 'INL', airportName: 'International Falls, MN - INL' },
      city: 'International Falls',
      state: 'MN'
    }, {
      airport: {
        code: 'IMT',
        airportName: 'Iron Mountain/Kingsford, MI - IMT'
      },
      city: 'Iron Mountain/Kingsford',
      state: 'MI'
    }, {
      airport: { code: 'ITH', airportName: 'Ithaca, NY - ITH' },
      city: 'Ithaca',
      state: 'NY'
    }, {
      airport: {
        code: 'ZIH',
        airportName: 'Ixtapa/Zihuatanejo, Guerrero - ZIH'
      },
      city: 'Ixtapa/Zihuatanejo',
      state: 'Guerrero'
    }, {
      airport: { code: 'JAC', airportName: 'Jackson, WY - JAC' },
      city: 'Jackson',
      state: 'WY'
    }, {
      airport: { code: 'JAN', airportName: 'Jackson, MS - JAN' },
      city: 'Jackson',
      state: 'MS'
    }, {
      airport: { code: 'JXN', airportName: 'Jackson, MI - JXN' },
      city: 'Jackson',
      state: 'MI'
    }, {
      airport: { code: 'MKL', airportName: 'Jackson, TN - MKL' },
      city: 'Jackson',
      state: 'TN'
    }, {
      airport: { code: 'JAX', airportName: 'Jacksonville, FL - JAX' },
      city: 'Jacksonville',
      state: 'FL'
    }, {
      airport: { code: 'OAJ', airportName: 'Jacksonville, NC - OAJ' },
      city: 'Jacksonville',
      state: 'NC'
    }, {
      airport: { code: 'JHW', airportName: 'Jamestown, NY - JHW' },
      city: 'Jamestown',
      state: 'NY'
    }, {
      airport: { code: 'JMS', airportName: 'Jamestown, ND - JMS' },
      city: 'Jamestown',
      state: 'ND'
    }, {
      airport: {
        code: 'JFK',
        airportName: 'JFK International Airport, NY - JFK'
      },
      city: 'JFK International Airport',
      state: 'NY'
    }, {
      airport: { code: 'JBR', airportName: 'Jonesboro, AR - JBR' },
      city: 'Jonesboro',
      state: 'AR'
    }, {
      airport: { code: 'JLN', airportName: 'Joplin, MO - JLN' },
      city: 'Joplin',
      state: 'MO'
    }, {
      airport: { code: 'JNU', airportName: 'Juneau, AK - JNU' },
      city: 'Juneau',
      state: 'AK'
    }, {
      airport: { code: 'AZO', airportName: 'Kalamazoo, MI - AZO' },
      city: 'Kalamazoo',
      state: 'MI'
    }, {
      airport: { code: 'FCA', airportName: 'Kalispell, MT - FCA' },
      city: 'Kalispell',
      state: 'MT'
    }, {
      airport: { code: 'MCI', airportName: 'Kansas City, MO - MCI' },
      city: 'Kansas City',
      state: 'MO'
    }, {
      airport: { code: 'MKC', airportName: 'Kansas City Airport, MO - MKC' },
      city: 'Kansas City Airport',
      state: 'MO'
    }, {
      airport: { code: 'JHM', airportName: 'Kapalua (Lahaina) Maui, HI - JHM' },
      city: 'Kapalua (Lahaina) Maui',
      state: 'HI'
    }, {
      airport: { code: 'EEN', airportName: 'Keene, NH - EEN' },
      city: 'Keene',
      state: 'NH'
    }, {
      airport: { code: 'ENA', airportName: 'Kenai, AK - ENA' },
      city: 'Kenai',
      state: 'AK'
    }, {
      airport: { code: 'KTN', airportName: 'Ketchikan, AK - KTN' },
      city: 'Ketchikan',
      state: 'AK'
    }, {
      airport: { code: 'EYW', airportName: 'Key West, FL - EYW' },
      city: 'Key West',
      state: 'FL'
    }, {
      airport: { code: 'ILE', airportName: 'Killeen, TX - ILE' },
      city: 'Killeen',
      state: 'TX'
    }, {
      airport: { code: 'IGM', airportName: 'Kingman, AZ - IGM' },
      city: 'Kingman',
      state: 'AZ'
    }, {
      airport: { code: 'IRK', airportName: 'Kirksville, MO - IRK' },
      city: 'Kirksville',
      state: 'MO'
    }, {
      airport: { code: 'TYS', airportName: 'Knoxville, TN - TYS' },
      city: 'Knoxville',
      state: 'TN'
    }, {
      airport: { code: 'KOA', airportName: 'Kona, HI - KOA' },
      city: 'Kona',
      state: 'HI'
    }, {
      airport: { code: 'LCI', airportName: 'Laconia, NH - LCI' },
      city: 'Laconia',
      state: 'NH'
    }, {
      airport: { code: 'LSE', airportName: 'La Crosse WI/Winona, MN - LSE' },
      city: 'La Crosse WI/Winona',
      state: 'MN'
    }, {
      airport: { code: 'LAF', airportName: 'Lafayette, IN - LAF' },
      city: 'Lafayette',
      state: 'IN'
    }, {
      airport: { code: 'LFT', airportName: 'Lafayette, LA - LFT' },
      city: 'Lafayette',
      state: 'LA'
    }, {
      airport: { code: 'LCH', airportName: 'Lake Charles, LA - LCH' },
      city: 'Lake Charles',
      state: 'LA'
    }, {
      airport: { code: 'HII', airportName: 'Lake Havasu City, AZ - HII' },
      city: 'Lake Havasu City',
      state: 'AZ'
    }, {
      airport: {
        code: 'TVL',
        airportName: 'Lake Tahoe (South Lake Tahoe), CA - TVL'
      },
      city: 'Lake Tahoe (South Lake Tahoe)',
      state: 'CA'
    }, {
      airport: { code: 'LNS', airportName: 'Lancaster, PA - LNS' },
      city: 'Lancaster',
      state: 'PA'
    }, {
      airport: { code: 'WJF', airportName: 'Lancaster/Palmdale, CA - WJF' },
      city: 'Lancaster/Palmdale',
      state: 'CA'
    }, {
      airport: { code: 'LAN', airportName: 'Lansing, MI - LAN' },
      city: 'Lansing',
      state: 'MI'
    }, {
      airport: {
        code: 'LAP',
        airportName: 'La Paz, Baja California Sur - LAP'
      },
      city: 'La Paz',
      state: 'Baja California Sur'
    }, {
      airport: { code: 'LAR', airportName: 'Laramie, WY - LAR' },
      city: 'Laramie',
      state: 'WY'
    }, {
      airport: { code: 'LRD', airportName: 'Laredo, TX - LRD' },
      city: 'Laredo',
      state: 'TX'
    }, {
      airport: { code: 'LRU', airportName: 'Las Cruces, NM - LRU' },
      city: 'Las Cruces',
      state: 'NM'
    }, {
      airport: { code: 'LAS', airportName: 'Las Vegas, NV - LAS' },
      city: 'Las Vegas',
      state: 'NV'
    }, {
      airport: { code: 'LAW', airportName: 'Lawton, OK - LAW' },
      city: 'Lawton',
      state: 'OK'
    }, {
      airport: { code: 'LEB', airportName: 'Lebanon, NH - LEB' },
      city: 'Lebanon',
      state: 'NH'
    }, {
      airport: { code: 'BJX', airportName: 'Leon Bajio, Guanajuato - BJX' },
      city: 'Leon Bajio',
      state: 'Guanajuato'
    }, {
      airport: { code: 'LUG', airportName: 'Lewisburg, TN - LUG' },
      city: 'Lewisburg',
      state: 'TN'
    }, {
      airport: { code: 'LEX', airportName: 'Lexington, KY - LEX' },
      city: 'Lexington',
      state: 'KY'
    }, {
      airport: { code: 'LIR', airportName: 'Liberia, Costa Rica - LIR' },
      city: 'Liberia',
      state: 'Costa Rica'
    }, {
      airport: { code: 'LIH', airportName: 'Lihue Kauai, HI - LIH' },
      city: 'Lihue Kauai',
      state: 'HI'
    }, {
      airport: { code: 'LNK', airportName: 'Lincoln, NE - LNK' },
      city: 'Lincoln',
      state: 'NE'
    }, {
      airport: { code: 'LIT', airportName: 'Little Rock, AR - LIT' },
      city: 'Little Rock',
      state: 'AR'
    }, {
      airport: { code: 'LGB', airportName: 'Long Beach, CA - LGB' },
      city: 'Long Beach',
      state: 'CA'
    }, {
      airport: { code: 'ISP', airportName: 'Long Island/Islip, NY - ISP' },
      city: 'Long Island/Islip',
      state: 'NY'
    }, {
      airport: { code: 'GGG', airportName: 'Longview/Gladewater, TX - GGG' },
      city: 'Longview/Gladewater',
      state: 'TX'
    }, {
      airport: { code: 'LAX', airportName: 'Los Angeles, CA - LAX' },
      city: 'Los Angeles',
      state: 'CA'
    }, {
      airport: { code: 'LMM', airportName: 'Los Mochis, Sinaloa - LMM' },
      city: 'Los Mochis',
      state: 'Sinaloa'
    }, {
      airport: { code: 'SDF', airportName: 'Louisville, KY - SDF' },
      city: 'Louisville',
      state: 'KY'
    }, {
      airport: { code: 'LBB', airportName: 'Lubbock, TX - LBB' },
      city: 'Lubbock',
      state: 'TX'
    }, {
      airport: { code: 'LYH', airportName: 'Lynchburg, VA - LYH' },
      city: 'Lynchburg',
      state: 'VA'
    }, {
      airport: { code: 'MCN', airportName: 'Macon, GA - MCN' },
      city: 'Macon',
      state: 'GA'
    }, {
      airport: { code: 'MSN', airportName: 'Madison, WI - MSN' },
      city: 'Madison',
      state: 'WI'
    }, {
      airport: { code: 'MHT', airportName: 'Manchester, NH - MHT' },
      city: 'Manchester',
      state: 'NH'
    }, {
      airport: { code: 'MTH', airportName: 'Marathon, FL - MTH' },
      city: 'Marathon',
      state: 'FL'
    }, {
      airport: { code: 'MRK', airportName: 'Marco Island, FL - MRK' },
      city: 'Marco Island',
      state: 'FL'
    }, {
      airport: { code: 'MQT', airportName: 'Marquette, MI - MQT' },
      city: 'Marquette',
      state: 'MI'
    }, {
      airport: { code: 'OGG', airportName: 'Maui, HI - OGG' },
      city: 'Maui',
      state: 'HI'
    }, {
      airport: { code: 'MZT', airportName: 'Mazatlan, Sinaloa - MZT' },
      city: 'Mazatlan',
      state: 'Sinaloa'
    }, {
      airport: { code: 'MFE', airportName: 'McAllen, TX - MFE' },
      city: 'McAllen',
      state: 'TX'
    }, {
      airport: { code: 'MFR', airportName: 'Medford, OR - MFR' },
      city: 'Medford',
      state: 'OR'
    }, {
      airport: { code: 'MLB', airportName: 'Melbourne, FL - MLB' },
      city: 'Melbourne',
      state: 'FL'
    }, {
      airport: { code: 'MEM', airportName: 'Memphis, TN - MEM' },
      city: 'Memphis',
      state: 'TN'
    }, {
      airport: { code: 'MCE', airportName: 'Merced, CA - MCE' },
      city: 'Merced',
      state: 'CA'
    }, {
      airport: { code: 'MID', airportName: 'Merida, Yucatan - MID' },
      city: 'Merida',
      state: 'Yucatan'
    }, {
      airport: { code: 'MEI', airportName: 'Meridian, MS - MEI' },
      city: 'Meridian',
      state: 'MS'
    }, {
      airport: { code: 'MSC', airportName: 'Mesa, AZ - MSC' },
      city: 'Mesa',
      state: 'AZ'
    }, {
      airport: { code: 'MXL', airportName: 'Mexicali, Baja California - MXL' },
      city: 'Mexicali',
      state: 'Baja California'
    }, {
      airport: { code: 'MEX', airportName: 'Mexico City, Mexico - MEX' },
      city: 'Mexico City',
      state: 'Mexico'
    }, {
      airport: {
        code: 'TLC',
        airportName: 'Mexico City/Toluca, Mexico State - TLC'
      },
      city: 'Mexico City/Toluca',
      state: 'Mexico State'
    }, {
      airport: { code: 'MIA', airportName: 'Miami, FL - MIA' },
      city: 'Miami',
      state: 'FL'
    }, {
      airport: { code: 'MAF', airportName: 'Midland/Odessa, TX - MAF' },
      city: 'Midland/Odessa',
      state: 'TX'
    }, {
      airport: { code: 'MKE', airportName: 'Milwaukee, WI - MKE' },
      city: 'Milwaukee',
      state: 'WI'
    }, {
      airport: {
        code: 'MSP',
        airportName: 'Minneapolis/St. Paul (Terminal 2), MN - MSP'
      },
      city: 'Minneapolis/St. Paul (Terminal 2)',
      state: 'MN'
    }, {
      airport: { code: 'MOT', airportName: 'Minot, ND - MOT' },
      city: 'Minot',
      state: 'ND'
    }, {
      airport: { code: 'MSO', airportName: 'Missoula, MT - MSO' },
      city: 'Missoula',
      state: 'MT'
    }, {
      airport: { code: 'MOB', airportName: 'Mobile, AL - MOB' },
      city: 'Mobile',
      state: 'AL'
    }, {
      airport: { code: 'MOD', airportName: 'Modesto, CA - MOD' },
      city: 'Modesto',
      state: 'CA'
    }, {
      airport: { code: 'MLI', airportName: 'Moline, IL - MLI' },
      city: 'Moline',
      state: 'IL'
    }, {
      airport: { code: 'MLU', airportName: 'Monroe, LA - MLU' },
      city: 'Monroe',
      state: 'LA'
    }, {
      airport: { code: 'MBJ', airportName: 'Montego Bay, Jamaica - MBJ' },
      city: 'Montego Bay',
      state: 'Jamaica'
    }, {
      airport: { code: 'MRY', airportName: 'Monterey, CA - MRY' },
      city: 'Monterey',
      state: 'CA'
    }, {
      airport: { code: 'MTY', airportName: 'Monterrey, Nuevo Leon - MTY' },
      city: 'Monterrey',
      state: 'Nuevo Leon'
    }, {
      airport: { code: 'MGM', airportName: 'Montgomery, AL - MGM' },
      city: 'Montgomery',
      state: 'AL'
    }, {
      airport: {
        code: 'YUL',
        airportName: 'Montreal-Trudeau International Airport, QC - YUL'
      },
      city: 'Montreal-Trudeau International Airport',
      state: 'QC'
    }, {
      airport: { code: 'MTJ', airportName: 'Montrose, CO - MTJ' },
      city: 'Montrose',
      state: 'CO'
    }, {
      airport: { code: 'MLM', airportName: 'Morelia, Michoacan - MLM' },
      city: 'Morelia',
      state: 'Michoacan'
    }, {
      airport: { code: 'MGW', airportName: 'Morgantown, WV - MGW' },
      city: 'Morgantown',
      state: 'WV'
    }, {
      airport: { code: 'MMU', airportName: 'Morristown, NJ - MMU' },
      city: 'Morristown',
      state: 'NJ'
    }, {
      airport: { code: 'MSL', airportName: 'Muscle Shoals, AL - MSL' },
      city: 'Muscle Shoals',
      state: 'AL'
    }, {
      airport: { code: 'MKG', airportName: 'Muskegon, MI - MKG' },
      city: 'Muskegon',
      state: 'MI'
    }, {
      airport: { code: 'MYR', airportName: 'Myrtle Beach, SC - MYR' },
      city: 'Myrtle Beach',
      state: 'SC'
    }, {
      airport: { code: 'APF', airportName: 'Naples, FL - APF' },
      city: 'Naples',
      state: 'FL'
    }, {
      airport: { code: 'BNA', airportName: 'Nashville, TN - BNA' },
      city: 'Nashville',
      state: 'TN'
    }, {
      airport: { code: 'NAS', airportName: 'Nassau, Bahamas - NAS' },
      city: 'Nassau',
      state: 'Bahamas'
    }, {
      airport: { code: 'EWB', airportName: 'New Bedford, MA - EWB' },
      city: 'New Bedford',
      state: 'MA'
    }, {
      airport: { code: 'EWN', airportName: 'New Bern, NC - EWN' },
      city: 'New Bern',
      state: 'NC'
    }, {
      airport: { code: 'SWF', airportName: 'Newburgh, NY - SWF' },
      city: 'Newburgh',
      state: 'NY'
    }, {
      airport: { code: 'HVN', airportName: 'New Haven, CT - HVN' },
      city: 'New Haven',
      state: 'CT'
    }, {
      airport: { code: 'MSY', airportName: 'New Orleans, LA - MSY' },
      city: 'New Orleans',
      state: 'LA'
    }, {
      airport: { code: 'PHF', airportName: 'Newport News, VA - PHF' },
      city: 'Newport News',
      state: 'VA'
    }, {
      airport: { code: 'EWR', airportName: 'New York/Newark, NJ - EWR' },
      city: 'New York/Newark',
      state: 'NJ'
    }, {
      airport: { code: 'LGA', airportName: 'New York (LaGuardia), NY - LGA' },
      city: 'New York (LaGuardia)',
      state: 'NY'
    }, {
      airport: { code: 'IAG', airportName: 'Niagara Falls, NY - IAG' },
      city: 'Niagara Falls',
      state: 'NY'
    }, {
      airport: { code: 'OFK', airportName: 'Norfolk, NE - OFK' },
      city: 'Norfolk',
      state: 'NE'
    }, {
      airport: { code: 'ORF', airportName: 'Norfolk, VA - ORF' },
      city: 'Norfolk',
      state: 'VA'
    }, {
      airport: { code: 'OTH', airportName: 'North Bend, OR - OTH' },
      city: 'North Bend',
      state: 'OR'
    }, {
      airport: { code: 'LBF', airportName: 'North Platte, NE - LBF' },
      city: 'North Platte',
      state: 'NE'
    }, {
      airport: { code: 'NRN', airportName: 'Norton, KS - NRN' },
      city: 'Norton',
      state: 'KS'
    }, {
      airport: { code: 'OWD', airportName: 'Norwood, MA - OWD' },
      city: 'Norwood',
      state: 'MA'
    }, {
      airport: { code: 'OAK', airportName: 'Oakland, CA - OAK' },
      city: 'Oakland',
      state: 'CA'
    }, {
      airport: { code: 'OAX', airportName: 'Oaxaca, Oaxaca - OAX' },
      city: 'Oaxaca',
      state: 'Oaxaca'
    }, {
      airport: { code: 'OCF', airportName: 'Ocala, FL - OCF' },
      city: 'Ocala',
      state: 'FL'
    }, {
      airport: { code: 'OKC', airportName: 'Oklahoma City, OK - OKC' },
      city: 'Oklahoma City',
      state: 'OK'
    }, {
      airport: { code: 'OLM', airportName: 'Olympia, WA - OLM' },
      city: 'Olympia',
      state: 'WA'
    }, {
      airport: { code: 'OMA', airportName: 'Omaha, NE - OMA' },
      city: 'Omaha',
      state: 'NE'
    }, {
      airport: { code: 'ONT', airportName: 'Ontario/LA, CA - ONT' },
      city: 'Ontario/LA',
      state: 'CA'
    }, {
      airport: {
        code: 'SNA',
        airportName: 'Orange County/Santa Ana, CA - SNA'
      },
      city: 'Orange County/Santa Ana',
      state: 'CA'
    }, {
      airport: { code: 'MCO', airportName: 'Orlando, FL - MCO' },
      city: 'Orlando',
      state: 'FL'
    }, {
      airport: { code: 'SFB', airportName: 'Orlando Sanford, FL - SFB' },
      city: 'Orlando Sanford',
      state: 'FL'
    }, {
      airport: { code: 'OXR', airportName: 'Oxnard, CA - OXR' },
      city: 'Oxnard',
      state: 'CA'
    }, {
      airport: { code: 'PAH', airportName: 'Paducah, KY - PAH' },
      city: 'Paducah',
      state: 'KY'
    }, {
      airport: { code: 'PGA', airportName: 'Page, AZ - PGA' },
      city: 'Page',
      state: 'AZ'
    }, {
      airport: { code: 'PSP', airportName: 'Palm Springs, CA - PSP' },
      city: 'Palm Springs',
      state: 'CA'
    }, {
      airport: { code: 'PFN', airportName: 'Panama City, FL - PFN' },
      city: 'Panama City',
      state: 'FL'
    }, {
      airport: { code: 'ECP', airportName: 'Panama City Beach, FL - ECP' },
      city: 'Panama City Beach',
      state: 'FL'
    }, {
      airport: { code: 'PKB', airportName: 'Parkersburg, WV - PKB' },
      city: 'Parkersburg',
      state: 'WV'
    }, {
      airport: {
        code: 'PSC',
        airportName: 'Pasco/Richland/Kennewick, WA - PSC'
      },
      city: 'Pasco/Richland/Kennewick',
      state: 'WA'
    }, {
      airport: { code: 'PNS', airportName: 'Pensacola, FL - PNS' },
      city: 'Pensacola',
      state: 'FL'
    }, {
      airport: { code: 'PIA', airportName: 'Peoria, IL - PIA' },
      city: 'Peoria',
      state: 'IL'
    }, {
      airport: { code: 'PHL', airportName: 'Philadelphia, PA - PHL' },
      city: 'Philadelphia',
      state: 'PA'
    }, {
      airport: { code: 'PHX', airportName: 'Phoenix, AZ - PHX' },
      city: 'Phoenix',
      state: 'AZ'
    }, {
      airport: { code: 'PIR', airportName: 'Pierre, SD - PIR' },
      city: 'Pierre',
      state: 'SD'
    }, {
      airport: { code: 'PIT', airportName: 'Pittsburgh, PA - PIT' },
      city: 'Pittsburgh',
      state: 'PA'
    }, {
      airport: { code: 'PIH', airportName: 'Pocatello, ID - PIH' },
      city: 'Pocatello',
      state: 'ID'
    }, {
      airport: { code: 'PLK', airportName: 'Point Lookout, MO - PLK' },
      city: 'Point Lookout',
      state: 'MO'
    }, {
      airport: { code: 'PNC', airportName: 'Ponca City, OK - PNC' },
      city: 'Ponca City',
      state: 'OK'
    }, {
      airport: { code: 'PTK', airportName: 'Pontiac, MI - PTK' },
      city: 'Pontiac',
      state: 'MI'
    }, {
      airport: { code: 'PDX', airportName: 'Portland, OR - PDX' },
      city: 'Portland',
      state: 'OR'
    }, {
      airport: { code: 'PWM', airportName: 'Portland, ME - PWM' },
      city: 'Portland',
      state: 'ME'
    }, {
      airport: { code: 'PRC', airportName: 'Prescott, AZ - PRC' },
      city: 'Prescott',
      state: 'AZ'
    }, {
      airport: { code: 'PVD', airportName: 'Providence, RI - PVD' },
      city: 'Providence',
      state: 'RI'
    }, {
      airport: { code: 'PVU', airportName: 'Provo, UT - PVU' },
      city: 'Provo',
      state: 'UT'
    }, {
      airport: { code: 'PBC', airportName: 'Puebla, Puebla - PBC' },
      city: 'Puebla',
      state: 'Puebla'
    }, {
      airport: { code: 'PVR', airportName: 'Puerto Vallarta, MX - PVR' },
      city: 'Puerto Vallarta',
      state: 'MX'
    }, {
      airport: { code: 'PUJ', airportName: 'Punta Cana, DO - PUJ' },
      city: 'Punta Cana',
      state: 'DO'
    }, {
      airport: { code: 'PGD', airportName: 'Punta Gorda, FL - PGD' },
      city: 'Punta Gorda',
      state: 'FL'
    }, {
      airport: { code: 'RDU', airportName: 'Raleigh/Durham, NC - RDU' },
      city: 'Raleigh/Durham',
      state: 'NC'
    }, {
      airport: { code: 'RAP', airportName: 'Rapid City, SD - RAP' },
      city: 'Rapid City',
      state: 'SD'
    }, {
      airport: { code: 'RDG', airportName: 'Reading, PA - RDG' },
      city: 'Reading',
      state: 'PA'
    }, {
      airport: { code: 'RDD', airportName: 'Redding, CA - RDD' },
      city: 'Redding',
      state: 'CA'
    }, {
      airport: { code: 'RDM', airportName: 'Redmond, OR - RDM' },
      city: 'Redmond',
      state: 'OR'
    }, {
      airport: { code: 'RNO', airportName: 'Reno/Tahoe, NV - RNO' },
      city: 'Reno/Tahoe',
      state: 'NV'
    }, {
      airport: { code: 'FRG', airportName: 'Republic, NY - FRG' },
      city: 'Republic',
      state: 'NY'
    }, {
      airport: { code: 'RHI', airportName: 'Rhinelander, WI - RHI' },
      city: 'Rhinelander',
      state: 'WI'
    }, {
      airport: { code: 'RIC', airportName: 'Richmond, VA - RIC' },
      city: 'Richmond',
      state: 'VA'
    }, {
      airport: { code: 'ROA', airportName: 'Roanoke, VA - ROA' },
      city: 'Roanoke',
      state: 'VA'
    }, {
      airport: { code: 'ROC', airportName: 'Rochester, NY - ROC' },
      city: 'Rochester',
      state: 'NY'
    }, {
      airport: { code: 'RST', airportName: 'Rochester, MN - RST' },
      city: 'Rochester',
      state: 'MN'
    }, {
      airport: { code: 'RFD', airportName: 'Rockford, IL - RFD' },
      city: 'Rockford',
      state: 'IL'
    }, {
      airport: { code: 'RKD', airportName: 'Rockland, ME - RKD' },
      city: 'Rockland',
      state: 'ME'
    }, {
      airport: { code: 'RKS', airportName: 'Rock Springs, WY - RKS' },
      city: 'Rock Springs',
      state: 'WY'
    }, {
      airport: { code: 'ROW', airportName: 'Roswell, NM - ROW' },
      city: 'Roswell',
      state: 'NM'
    }, {
      airport: { code: 'RUT', airportName: 'Rutland, VT - RUT' },
      city: 'Rutland',
      state: 'VT'
    }, {
      airport: { code: 'SAC', airportName: 'Sacramento, CA - SAC' },
      city: 'Sacramento',
      state: 'CA'
    }, {
      airport: { code: 'SMF', airportName: 'Sacramento, CA - SMF' },
      city: 'Sacramento',
      state: 'CA'
    }, {
      airport: { code: 'MBS', airportName: 'Saginaw, MI - MBS' },
      city: 'Saginaw',
      state: 'MI'
    }, {
      airport: { code: 'SLN', airportName: 'Salina, KS - SLN' },
      city: 'Salina',
      state: 'KS'
    }, {
      airport: { code: 'SBY', airportName: 'Salisbury, MD - SBY' },
      city: 'Salisbury',
      state: 'MD'
    }, {
      airport: { code: 'SLC', airportName: 'Salt Lake City, UT - SLC' },
      city: 'Salt Lake City',
      state: 'UT'
    }, {
      airport: { code: 'SJT', airportName: 'San Angelo, TX - SJT' },
      city: 'San Angelo',
      state: 'TX'
    }, {
      airport: { code: 'SAT', airportName: 'San Antonio, TX - SAT' },
      city: 'San Antonio',
      state: 'TX'
    }, {
      airport: { code: 'SAN', airportName: 'San Diego, CA - SAN' },
      city: 'San Diego',
      state: 'CA'
    }, {
      airport: { code: 'SFO', airportName: 'San Francisco, CA - SFO' },
      city: 'San Francisco',
      state: 'CA'
    }, {
      airport: { code: 'SJC', airportName: 'San Jose, CA - SJC' },
      city: 'San Jose',
      state: 'CA'
    }, {
      airport: { code: 'SJO', airportName: 'San Jose, Costa Rica - SJO' },
      city: 'San Jose',
      state: 'Costa Rica'
    }, {
      airport: { code: 'SJU', airportName: 'San Juan, PR - SJU' },
      city: 'San Juan',
      state: 'PR'
    }, {
      airport: { code: 'SBP', airportName: 'San Luis Obispo, CA - SBP' },
      city: 'San Luis Obispo',
      state: 'CA'
    }, {
      airport: { code: 'SBA', airportName: 'Santa Barbara, CA - SBA' },
      city: 'Santa Barbara',
      state: 'CA'
    }, {
      airport: { code: 'SAF', airportName: 'Santa Fe, NM - SAF' },
      city: 'Santa Fe',
      state: 'NM'
    }, {
      airport: { code: 'SMX', airportName: 'Santa Maria, CA - SMX' },
      city: 'Santa Maria',
      state: 'CA'
    }, {
      airport: { code: 'STS', airportName: 'Santa Rosa, CA - STS' },
      city: 'Santa Rosa',
      state: 'CA'
    }, {
      airport: { code: 'SLK', airportName: 'Saranac Lake, NY - SLK' },
      city: 'Saranac Lake',
      state: 'NY'
    }, {
      airport: { code: 'SRQ', airportName: 'Sarasota/Bradenton, FL - SRQ' },
      city: 'Sarasota/Bradenton',
      state: 'FL'
    }, {
      airport: { code: 'CIU', airportName: 'Sault Ste. Marie, MI - CIU' },
      city: 'Sault Ste. Marie',
      state: 'MI'
    }, {
      airport: { code: 'SAV', airportName: 'Savannah, GA - SAV' },
      city: 'Savannah',
      state: 'GA'
    }, {
      airport: { code: 'BFF', airportName: 'Scottsbluff, NE - BFF' },
      city: 'Scottsbluff',
      state: 'NE'
    }, {
      airport: { code: 'SDL', airportName: 'Scottsdale, AZ - SDL' },
      city: 'Scottsdale',
      state: 'AZ'
    }, {
      airport: { code: 'SEA', airportName: 'Seattle/Tacoma, WA - SEA' },
      city: 'Seattle/Tacoma',
      state: 'WA'
    }, {
      airport: { code: 'SHR', airportName: 'Sheridan, WY - SHR' },
      city: 'Sheridan',
      state: 'WY'
    }, {
      airport: { code: 'SOW', airportName: 'Show Low, AZ - SOW' },
      city: 'Show Low',
      state: 'AZ'
    }, {
      airport: { code: 'SHV', airportName: 'Shreveport, LA - SHV' },
      city: 'Shreveport',
      state: 'LA'
    }, {
      airport: { code: 'SDY', airportName: 'Sidney, MT - SDY' },
      city: 'Sidney',
      state: 'MT'
    }, {
      airport: { code: 'SUX', airportName: 'Sioux City, IA - SUX' },
      city: 'Sioux City',
      state: 'IA'
    }, {
      airport: { code: 'FSD', airportName: 'Sioux Falls, SD - FSD' },
      city: 'Sioux Falls',
      state: 'SD'
    }, {
      airport: { code: 'SIT', airportName: 'Sitka, AK - SIT' },
      city: 'Sitka',
      state: 'AK'
    }, {
      airport: { code: 'SBN', airportName: 'South Bend, IN - SBN' },
      city: 'South Bend',
      state: 'IN'
    }, {
      airport: { code: 'GEG', airportName: 'Spokane, WA - GEG' },
      city: 'Spokane',
      state: 'WA'
    }, {
      airport: { code: 'SGF', airportName: 'Springfield, MO - SGF' },
      city: 'Springfield',
      state: 'MO'
    }, {
      airport: { code: 'SGU', airportName: 'St. George, UT - SGU' },
      city: 'St. George',
      state: 'UT'
    }, {
      airport: { code: 'STL', airportName: 'St. Louis, MO - STL' },
      city: 'St. Louis',
      state: 'MO'
    }, {
      airport: { code: 'PIE', airportName: 'St. Petersburg, FL - PIE' },
      city: 'St. Petersburg',
      state: 'FL'
    }, {
      airport: {
        code: 'SHD',
        airportName: 'Staunton/Waynesboro/Harrisonburg, VA - SHD'
      },
      city: 'Staunton/Waynesboro/Harrisonburg',
      state: 'VA'
    }, {
      airport: {
        code: 'HDN',
        airportName: 'Steamboat Springs (Hayden), CO - HDN'
      },
      city: 'Steamboat Springs (Hayden)',
      state: 'CO'
    }, {
      airport: { code: 'SCK', airportName: 'Stockton, CA - SCK' },
      city: 'Stockton',
      state: 'CA'
    }, {
      airport: { code: 'YSB', airportName: 'Sudbury, ON - YSB' },
      city: 'Sudbury',
      state: 'ON'
    }, {
      airport: { code: 'SGR', airportName: 'Sugar Land (Houston), TX - SGR' },
      city: 'Sugar Land (Houston)',
      state: 'TX'
    }, {
      airport: { code: 'SUN', airportName: 'Sun Valley (Hailey), ID - SUN' },
      city: 'Sun Valley (Hailey)',
      state: 'ID'
    }, {
      airport: { code: 'SUW', airportName: 'Superior, WI - SUW' },
      city: 'Superior',
      state: 'WI'
    }, {
      airport: { code: 'SYR', airportName: 'Syracuse, NY - SYR' },
      city: 'Syracuse',
      state: 'NY'
    }, {
      airport: { code: 'TLH', airportName: 'Tallahassee, FL - TLH' },
      city: 'Tallahassee',
      state: 'FL'
    }, {
      airport: { code: 'TPA', airportName: 'Tampa, FL - TPA' },
      city: 'Tampa',
      state: 'FL'
    }, {
      airport: { code: 'TEB', airportName: 'Teterboro, NJ - TEB' },
      city: 'Teterboro',
      state: 'NJ'
    }, {
      airport: { code: 'TXK', airportName: 'Texarkana, AR - TXK' },
      city: 'Texarkana',
      state: 'AR'
    }, {
      airport: { code: 'TIJ', airportName: 'Tijuana, Baja California - TIJ' },
      city: 'Tijuana',
      state: 'Baja California'
    }, {
      airport: { code: 'YTS', airportName: 'Timmins, ON - YTS' },
      city: 'Timmins',
      state: 'ON'
    }, {
      airport: { code: 'TOL', airportName: 'Toledo, OH - TOL' },
      city: 'Toledo',
      state: 'OH'
    }, {
      airport: {
        code: 'YYZ',
        airportName: 'Toronto Pearson International Airport, ON - YYZ'
      },
      city: 'Toronto Pearson International Airport',
      state: 'ON'
    }, {
      airport: { code: 'TVC', airportName: 'Traverse City, MI - TVC' },
      city: 'Traverse City',
      state: 'MI'
    }, {
      airport: { code: 'TUS', airportName: 'Tucson, AZ - TUS' },
      city: 'Tucson',
      state: 'AZ'
    }, {
      airport: { code: 'TUL', airportName: 'Tulsa, OK - TUL' },
      city: 'Tulsa',
      state: 'OK'
    }, {
      airport: { code: 'UTM', airportName: 'Tunica, MS - UTM' },
      city: 'Tunica',
      state: 'MS'
    }, {
      airport: { code: 'TUP', airportName: 'Tupelo, MS - TUP' },
      city: 'Tupelo',
      state: 'MS'
    }, {
      airport: { code: 'TCL', airportName: 'Tuscaloosa, AL - TCL' },
      city: 'Tuscaloosa',
      state: 'AL'
    }, {
      airport: { code: 'TWF', airportName: 'Twin Falls, ID - TWF' },
      city: 'Twin Falls',
      state: 'ID'
    }, {
      airport: { code: 'TYR', airportName: 'Tyler, TX - TYR' },
      city: 'Tyler',
      state: 'TX'
    }, {
      airport: { code: 'EGE', airportName: 'Vail/Eagle, CO - EGE' },
      city: 'Vail/Eagle',
      state: 'CO'
    }, {
      airport: { code: 'VLD', airportName: 'Valdosta, GA - VLD' },
      city: 'Valdosta',
      state: 'GA'
    }, {
      airport: { code: 'YVR', airportName: 'Vancouver Airport, BC - YVR' },
      city: 'Vancouver Airport',
      state: 'BC'
    }, {
      airport: { code: 'VNY', airportName: 'Van Nuys, CA - VNY' },
      city: 'Van Nuys',
      state: 'CA'
    }, {
      airport: { code: 'VCT', airportName: 'Victoria, TX - VCT' },
      city: 'Victoria',
      state: 'TX'
    }, {
      airport: { code: 'ACT', airportName: 'Waco, TX - ACT' },
      city: 'Waco',
      state: 'TX'
    }, {
      airport: { code: 'ALW', airportName: 'Walla Walla, WA - ALW' },
      city: 'Walla Walla',
      state: 'WA'
    }, {
      airport: { code: 'IAD', airportName: 'Washington (Dulles), DC - IAD' },
      city: 'Washington (Dulles)',
      state: 'DC'
    }, {
      airport: {
        code: 'DCA',
        airportName: 'Washington (Reagan National), DC - DCA'
      },
      city: 'Washington (Reagan National)',
      state: 'DC'
    }, {
      airport: { code: 'WVL', airportName: 'Waterville, ME - WVL' },
      city: 'Waterville',
      state: 'ME'
    }, {
      airport: { code: 'CWA', airportName: 'Wausau (Mosinee), WI - CWA' },
      city: 'Wausau (Mosinee)',
      state: 'WI'
    }, {
      airport: { code: 'PBI', airportName: 'West Palm Beach, FL - PBI' },
      city: 'West Palm Beach',
      state: 'FL'
    }, {
      airport: { code: 'HPN', airportName: 'White Plains, NY - HPN' },
      city: 'White Plains',
      state: 'NY'
    }, {
      airport: { code: 'ICT', airportName: 'Wichita, KS - ICT' },
      city: 'Wichita',
      state: 'KS'
    }, {
      airport: { code: 'SPS', airportName: 'Wichita Falls, TX - SPS' },
      city: 'Wichita Falls',
      state: 'TX'
    }, {
      airport: { code: 'AVP', airportName: 'Wilkes-Barre/Scranton, PA - AVP' },
      city: 'Wilkes-Barre/Scranton',
      state: 'PA'
    }, {
      airport: { code: 'IPT', airportName: 'Williamsport, PA - IPT' },
      city: 'Williamsport',
      state: 'PA'
    }, {
      airport: { code: 'ILG', airportName: 'Wilmington, DE - ILG' },
      city: 'Wilmington',
      state: 'DE'
    }, {
      airport: { code: 'ILM', airportName: 'Wilmington, NC - ILM' },
      city: 'Wilmington',
      state: 'NC'
    }, {
      airport: { code: 'INT', airportName: 'Winston-Salem, NC - INT' },
      city: 'Winston-Salem',
      state: 'NC'
    }, {
      airport: { code: 'ORH', airportName: 'Worcester, MA - ORH' },
      city: 'Worcester',
      state: 'MA'
    }, {
      airport: { code: 'YKM', airportName: 'Yakima, WA - YKM' },
      city: 'Yakima',
      state: 'WA'
    }, {
      airport: { code: 'YNG', airportName: 'Youngstown, OH - YNG' },
      city: 'Youngstown',
      state: 'OH'
    }, {
      airport: { code: 'YUM', airportName: 'Yuma, AZ - YUM' },
      city: 'Yuma',
      state: 'AZ'
    }, {
      airport: { code: 'ZCL', airportName: 'Zacatecas, Zacatecas - ZCL' },
      city: 'Zacatecas',
      state: 'Zacatecas'
    }];
  }

  build() {
    return {
      locations: this.locations
    };
  }
}
