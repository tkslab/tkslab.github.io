---
header_file: "header_for_various_topics.md"
---

{% include {{ page.header_file }}  %}

<nav>
	<ul class="breadcrumbs">
		<li><a href="/">ホーム</a></li>
		<li><a href="../">法学資料（日本）</a></li>
	</ul>
</nav>


## 公布済み現行法令件数とその調べ方

### 公布済み現行法令件数　（2020年09月20日現在）

#### 公布済み現行法令件数の内訳


| 種類 | 数 |
----|---- 
| 憲法 | 1 |
| 法律\|政令 | 2009 |


ℹ️ 　**法律** ではなく **法律\|政令** と記述しているのは、ポツダム命令に基づき制定された「出入国管理及び難民認定法」（昭和二十六年**政令**第三百十九号）を含めるためです。


| 種類 | 数 |
----|---- 
| 政令 | 2172 |
| 勅令 | 70 |
| 太政官布告 | 7 |
| 太政官達 | 3 |

 
| 種類 | 数 |
----|---- 
|府令| 390|
|省令|3390|
|経済安定本部令|   1|
|総理庁令|   1|
|法務庁令|   2|
|復興庁令|   3|
|内閣官房令|   3|
|閣令|  10|
|規則| 387|
|海上保安庁令|   2|
|内閣総理大臣決定|  11|


#### 憲法・法律、政令・勅令、府省令の一覧

csv 形式にまとめました。公布年月日、法令の種類、法令番号、法令名称の順に記述しています。
これらは、[e-Gov法令検索](https://elaws.e-gov.go.jp/search/elawsSearch/elaws_search/lsg0100/) の法令API を用いて取得したものです。
 
 
 - [憲法・法律.csv](https://github.com/tkslab/tkslab.github.io/blob/master/law/jp/general/primary-and-secondary-legislation/憲法・法律.csv)
 - [政令・勅令.csv](https://github.com/tkslab/tkslab.github.io/blob/master/law/jp/general/primary-and-secondary-legislation/政令・勅令.csv) 
 - [府省令.csv](https://github.com/tkslab/tkslab.github.io/blob/master/law/jp/general/primary-and-secondary-legislation/府省令.csv)

 

 
### 公布済み現行法令件数の調べ方

e-Gov の法令APIを利用します。次のページで配布されている「法令API仕様書（Version1）」の説明に従ってください。

-  [法令APIについて｜電子政府の総合窓口e-Gov イーガブ](https://www.e-gov.go.jp/elaws/interface_api/index.html)
 
### ソースコード

- [get_list_of_primary_and_secondary_legislation.py](https://github.com/tkslab/tkslab.github.io/blob/master/law/jp/general/primary-and-secondary-legislation/get_list_of_primary_and_secondary_legislation.py)

