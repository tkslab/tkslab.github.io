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
      (number - self.size.modulo(number)).times {
        self.push("dummy")
      }
    end
  end

  # ダミー文字列を除去
  def remove_filler
    self.replace(self.map { |group| group.reject("dummy") })
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
  # max_number = 8
  max_number = max_number.to_i

  source = ("A".."Z").to_a.delete_at(0, max_number)

  # 1グループあたりの要素
  number_of_elements_in_one_group = 3

  # グループ分けしやすいようダミー文字列を要素として挿入
  source.set_number_of_elements_in_one_group(number_of_elements_in_one_group)
  source.my_fill_with_string

  # 要素の組み合わせを求める
  pattern_of_elements = source.combinations(number_of_elements_in_one_group)

  pattern_of_elements.remove_filler
  pattern_of_elements.uniq!
  pattern_of_elements.remove_group_with_only_one_element

  # グループの組み合わせをすべて求める
  pattern_of_groups = pattern_of_elements.combinations(source.number_of_groups)

  pattern_of_groups.select! { |item|
    # 2人以上のグループ
    item.all? { |elem| elem.size > 1 } && \
            # 全員が出現
 item.flatten.size == max_number && \
            # 1人が同時に複数のグループに属していない
 item.flatten.size == item.flatten.uniq.size
  }

  spawn same_thread: true do
    # 既に出現したグループが一部に見つかったら除去
    uniq_groups = Array(Array(String)).new

    pattern_of_groups.select! { |groups|
      result = groups.each.all? { |group|
        !uniq_groups.find { |uniq_pattern| group == uniq_pattern }
      }

      groups.each { |group| uniq_groups.push(group) } if result

      result
    }
  end

  Fiber.yield

  pattern_of_groups.each.with_index(1) do |group, index|
    puts "#{sprintf("%02d", index)}：#{group.join(", ")}"
  end
end
