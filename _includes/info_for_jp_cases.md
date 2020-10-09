| 種類 | 情報 |
| --- | --- |
| 裁判所 | {{ page.kind_of_court }} |
| 裁判の種類 |  {{ page.kind_of_judgment }}  |
| 言渡期日 |  {{ page.day_of_judgment }}  |
| 事件番号 |  {{ page.docket_number }}  |
| 事件名 |  {{ page.case_name }}  |
| 出典 |  {{ page.law_reports }}  |
{% if page.commentary_by_research_law_clerk %}
| 調査官解説の出典 |  {{ page.commentary_by_research_law_clerk }}  |
{% endif %}
{% if page.teaching_materials %}
| 学習用判例集 |  {{ page.teaching_materials }}  |
{% endif %}
{% if page.party_name %}
| 審級関係 |  {{ page.step }}  |
{% endif %}
{% if page.party_name %}
| 当事者 |  {{ page.party_name }}  |
{% endif %}
