### 裁判情報


<dl>
	<dt>裁判所</dt><dd>{{ page.kind_of_court }} </dd>
	<dt>裁判の種類</dt><dd>{{ page.kind_of_judgment }}  </dd>
	<dt>言渡期日</dt><dd>{{ page.day_of_judgment }}  </dd>
	<dt>事件番号</dt><dd>{{ page.docket_number | replace:'|','</dd><dd>' }}  </dd>
	<dt>事件名</dt><dd>{{ page.case_name }}  </dd>
	<dt>出典</dt><dd>{{ page.law_reports }}  </dd>
	{% if page.commentary_by_research_law_clerk %}
	<dt>調査官解説の出典</dt><dd>{{ page.commentary_by_research_law_clerk }}  </dd>
	{% endif %}
	{% if page.teaching_materials %}
	<dt>学習用判例集</dt><dd>{{ page.teaching_materials | replace:'|','</dd><dd>' }}  </dd>
	{% endif %}
	{% if page.step %}
	<dt>審級関係</dt><dd>{{ page.step | replace:'|','</dd><dd>' }}  </dd>
	{% endif %}
	{% if page.party_name %}
	<dt>当事者</dt><dd>{{ page.party_name | replace:'|','</dd><dd>'  }}  </dd>
	{% endif %}
</dl>
