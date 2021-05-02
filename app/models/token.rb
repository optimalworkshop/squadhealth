class Token
  def self.key
    Rails.application.secrets.secret_key_base
  end

  def self.for(person)
    payload = { id: person.id }
    JsonWebToken.sign(payload, key: key)
  end

  def self.verify(token)
    return nil if token.blank?

    result = JsonWebToken.verify(token, key: key)
    return nil if result[:error]

    Person.find_by(id: result[:ok][:id])
  end
end
