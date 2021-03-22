## 裁判情報

<nav class="notice">
	<dl>
	<dt>裁判所</dt><dd>{{ page.types_of_courts }} </dd>
	<dt>事件番号</dt><dd>{{ page.docket_number | replace:'|','</dd><dd>' }}  </dd>
	<dt>事件名</dt><dd>{{ page.case_name | replace:'|','</dd><dd>' }}  </dd>
	<dt>裁判年月日</dt><dd>{{ page.judgment_date }}  </dd>
	<dt>裁判種別</dt><dd>{{ page.types_of_judgment }}  </dd>
	<dt>判例集等巻・号・頁</dt><dd>{{ page.citation }}  </dd>
	
	{% if page.source_of_commentary_by_research_law_clerk %}
	<dt>調査官解説の出典</dt><dd>{{ page.source_of_commentary_by_research_law_clerk | replace:'|','</dd><dd>'  }}  </dd>
	{% endif %}
	
	{% if page.teaching_materials %}
	<dt>教材</dt><dd>{{ page.teaching_materials | replace:'|','</dd><dd>' }}  </dd>
	{% endif %}
	
	{% if page.step %}
	<dt>審級関係</dt><dd>{{ page.step | replace:'|','</dd><dd>' }}  </dd>
	{% endif %}
	
	{% if page.party_name %}
	<dt>当事者</dt><dd>{{ page.party_name | replace:'|','</dd><dd>'  }}  </dd>
	{% endif %}
</dl>
</nav>
