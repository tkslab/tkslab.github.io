import requests
import xmltodict
import re
import codecs


type_of_legislation = "憲法・法律"
#type_of_legislation = "政令・勅令"
#type_of_legislation = "府省令"


save_as_csv = False
#save_as_csv = True
csv_path = "{:s}.csv".format(type_of_legislation)


dict_for_type_of_legislation = {
  "憲法・法律": {
    'api_number': 2
    ,'pattern': ("憲法", "法律|政令")
  },
  "政令・勅令": {
    'api_number': 3
    ,'pattern': (
      "政令", "勅令", "太政官布告", "太政官達"
    )
  },
  "府省令": {
    'api_number': 4
    ,'pattern': (
      "府令", "省令", "経済安定本部令", "総理庁令", "法務庁令", "復興庁令", "内閣官房令", "閣令", "規則", "海上保安庁令", "内閣総理大臣決定"
    )
  }
}


dict_for_search_patterns = {}

for item in dict_for_type_of_legislation[type_of_legislation]['pattern']:
    dict_for_search_patterns[item] = 0


url = f"https://elaws.e-gov.go.jp/api/1/lawlists/{dict_for_type_of_legislation[type_of_legislation]['api_number']}"
try:
    r = requests.get(url)
    dict = xmltodict.parse(r.text)
    line = ""

    for item in dict['DataRoot']['ApplData']['LawNameListInfo']:
        for key, value in dict_for_search_patterns.items():
            if not re.search(key, item['LawNo']):
                continue

            dict_for_search_patterns[key] = value + 1

            if save_as_csv:
                line += "{0},{1},{2},{3}".format(
                    item['PromulgationDate']
                    , key
                    , item['LawNo']
                    , item['LawName']) + "\n"
                

    for key, value in dict_for_search_patterns.items():
        print('{:　>8s}：　{:>4d}'.format(
            re.sub("\|","｜", key)
            , value))


    if save_as_csv:
        with open(csv_path, 'w', encoding = "utf_8") as f:
            try:
                f.write(line)
                print("csv の保存が完了しました：　{:s}".format(csv_path))
            except  Exception as e:
                print(e)
   
    
except requests.exceptions.RequestException as err:
    print(err)
