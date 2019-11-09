defmodule Timesheet2.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :email, :string
    field :isManager, :boolean, default: false
    field :name, :string
    field :password_hash, :string

    has_many :tasks, Timesheet2.Tasks.Task

    field :password, :string, virtual: true


    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :email, :isManager, :password])
    |> hash_password()
    |> validate_required([:name, :email, :isManager, :password_hash])
  end

  def hash_password(cset) do
    pw = get_change(cset, :password)
    change(cset, Argon2.add_hash(pw))
  end
end
