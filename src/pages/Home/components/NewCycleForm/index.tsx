import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { FormContainer, TaskInput, MinutesAmountInput } from './styles'
import { z } from 'zod'

const newCycleFormValidationSchema = z.object({
  task: z.string().nonempty('Informe o nome da tarefa'),
  minutesAmount: z
    .number()
    .min(5, 'O ciclo tenque ter no mínimo 5 minutos')
    .max(60, 'O ciclo tenque ter no máximo 5 minutos'),
})

type NewCycleFormData = z.infer<typeof newCycleFormValidationSchema>

export function NewCycleForm() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 5,
    },
  })

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        type="text"
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
        {...register('task')}
      />

      <datalist id="task-suggestions">
        <option>Projeto 1</option>
        <option>Projeto 2</option>
        <option>Projeto 3</option>
        <option>Banana</option>
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        disabled={!!activeCycle}
        step={5}
        min={5}
        max={60}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}
