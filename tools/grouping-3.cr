class Array
  @number_of_elements_in_one_group = 0

  def set_number_of_elements_in_one_group(number)
    @number_of_elements_in_one_group = number
  end

  def number_of_groups
    (self.size / @number_of_elements_in_one_group).to_i
  end

  def my_fill_with_string
    number = @number_of_elements_in_one_group
    if self.size.modulo(number) > 0
      (number - self.size.modulo(number)).times { |i|
        self.push("dummy#{i + 1}")
      }
    end
  end

  # ダミー文字列を除去
  def remove_filler
    result = self.map { |group|
      group = group.join(" ").gsub(/dummy\d/, "").split(" ")
      group.select { |elem| elem != "" }
    }
    self.replace(result)
  end

  # グループに1人しかいないパターンを除外
  def remove_group_with_only_one_element
    self.replace(self.select { |item| item.size > 1 })
  end

  def my_include?(elem : String)
    self.include?(elem)
  end
end

ARGV.each do |max_number|
  # max_number = 7

  # 1グループあたりの人数
  number_of_elements_in_one_group = 3

  source = (1..max_number.to_i).to_a.map { |item| sprintf("%02d", item) }

  # グループ分けしやすいようダミー文字列で埋めておく
  source.set_number_of_elements_in_one_group(number_of_elements_in_one_group)
  source.my_fill_with_string

  # 人の組み合わせを求める
  people_pattern = source.combinations(number_of_elements_in_one_group)

  people_pattern.remove_filler
  people_pattern.uniq!
  people_pattern.remove_group_with_only_one_element

  # 1回目、2回目……n回目のグループの組み合わせを求める
  group_pattern = people_pattern.combinations(source.number_of_groups)

  # 1人が同時に複数のグループに属する場合を除外し、そして
  # 全員が現れない場合も除外
  group_pattern.select! { |item|
    item2 = item.flatten
    (item2.size - item2.uniq.size) == 0 && max_number.to_i == item2.size
  }


  # 一度出現したグループが見つかったらスキップ
  uniq_group = Array(Array(String)).new

  group_pattern.select! { |groups|
    result = groups.each.all? { |group|
      !uniq_group.find { |uniq_pattern| group == uniq_pattern }
    }

    if result
      groups.each { |group|
        uniq_group.push(group)
      }
    end

    result
  }

  group_pattern.each.with_index(1) do |element, index|
    puts "#{sprintf("%02d", index)}：#{element.join(", ")}"
  end
end
