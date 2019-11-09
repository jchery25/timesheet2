defmodule Timesheet2.TasksTest do
  use Timesheet2.DataCase

  alias Timesheet2.Tasks

  describe "tasks" do
    alias Timesheet2.Tasks.Task

    @valid_attrs %{job_code: "some job_code", note: "some note", number_of_hours: "120.5"}
    @update_attrs %{job_code: "some updated job_code", note: "some updated note", number_of_hours: "456.7"}
    @invalid_attrs %{job_code: nil, note: nil, number_of_hours: nil}

    def task_fixture(attrs \\ %{}) do
      {:ok, task} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Tasks.create_task()

      task
    end

    test "list_tasks/0 returns all tasks" do
      task = task_fixture()
      assert Tasks.list_tasks() == [task]
    end

    test "get_task!/1 returns the task with given id" do
      task = task_fixture()
      assert Tasks.get_task!(task.id) == task
    end

    test "create_task/1 with valid data creates a task" do
      assert {:ok, %Task{} = task} = Tasks.create_task(@valid_attrs)
      assert task.job_code == "some job_code"
      assert task.note == "some note"
      assert task.number_of_hours == Decimal.new("120.5")
    end

    test "create_task/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Tasks.create_task(@invalid_attrs)
    end

    test "update_task/2 with valid data updates the task" do
      task = task_fixture()
      assert {:ok, %Task{} = task} = Tasks.update_task(task, @update_attrs)
      assert task.job_code == "some updated job_code"
      assert task.note == "some updated note"
      assert task.number_of_hours == Decimal.new("456.7")
    end

    test "update_task/2 with invalid data returns error changeset" do
      task = task_fixture()
      assert {:error, %Ecto.Changeset{}} = Tasks.update_task(task, @invalid_attrs)
      assert task == Tasks.get_task!(task.id)
    end

    test "delete_task/1 deletes the task" do
      task = task_fixture()
      assert {:ok, %Task{}} = Tasks.delete_task(task)
      assert_raise Ecto.NoResultsError, fn -> Tasks.get_task!(task.id) end
    end

    test "change_task/1 returns a task changeset" do
      task = task_fixture()
      assert %Ecto.Changeset{} = Tasks.change_task(task)
    end
  end
end
