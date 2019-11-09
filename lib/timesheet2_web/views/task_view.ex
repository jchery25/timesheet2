defmodule Timesheet2Web.TaskView do
  use Timesheet2Web, :view
  alias Timesheet2Web.TaskView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      user_id: task.user_id,
      job_code: task.job_code,
      number_of_hours: task.number_of_hours,
      note: task.note
      }
  end
end
