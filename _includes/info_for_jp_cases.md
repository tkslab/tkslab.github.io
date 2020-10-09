### 裁判情報


| 種類 | 情報 |
| --- | --- |
| 裁判所 | {{ page.kind_of_court }} |
| 裁判の種類 |  {{ page.kind_of_judgment }}  |
| 言渡期日 |  {{ page.day_of_judgment }}  |
| 事件番号 |  {{ page.docket_number }}  |
| 事件名 |  {{ page.case_name }}  |
| 出典 |  {{ page.law_reports }}  |
{% if page.commentary_by_research_law_clerk %}| 調査官解説の出典 |  {{ page.commentary_by_research_law_clerk }}  |{% endif %}
{% if page.teaching_materials %}| 学習用判例集 |  {{ page.teaching_materials }}  |{% endif %}
{% if page.step %}| 審級関係 |  {{ page.step }}  |{% endif %}
{% if page.party_name %}| 当事者 |  {{ page.party_name }}  |{% endif %}


<dl>
	<dt>裁判所</dt><dd>{{ page.kind_of_court }} </dd>
	<dt>裁判の種類</dt><dd>{{ page.kind_of_judgment }}  </dd>
	<dt>言渡期日</dt><dd>{{ page.day_of_judgment }}  </dd>
	<dt>事件番号</dt><dd>{{ page.docket_number }}  </dd>
	<dt>事件名</dt><dd>{{ page.case_name }}  </dd>
	<dt>出典</dt><dd>{{ page.law_reports }}  </dd>
	{% if page.commentary_by_research_law_clerk %}
	<dt>調査官解説の出典</dt><dd>{{ page.commentary_by_research_law_clerk }}  </dd>
	{% endif %}
	{% if page.teaching_materials %}
	<dt>学習用判例集</dt><dd>{{ page.teaching_materials }}  </dd>
	{% endif %}
	{% if page.step %}
	<dt>審級関係</dt><dd>{{ page.step }}  </dd>
	{% endif %}
	{% if page.party_name %}
	<dt>当事者</dt><dd>{{ page.party_name }}  </dd>
	{% endif %}
</dl>
