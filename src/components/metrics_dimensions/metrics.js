export const costMetrics = [
  { value: 'unblended_cost', key: 'metrics', label: 'Cost (Total)', clearableValue: false },
  { value: 'adjusted_cost', key: 'metrics', label: 'Cost (Adjusted)', clearableValue: false },
  { value: 'total_amortized_cost', key: 'metrics', label: 'Cost (Amortized)', clearableValue: false },
  { value: 'total_adjusted_amortized_cost', key: 'metrics', label: 'Cost (Adjusted Amortized)', clearableValue: false },
  { value: 'invoiced_cost', key: 'metrics', label: 'Cost (Total Blended)', clearableValue: false },
  { value: 'cost_adjusted', key: 'metrics', label: 'Cost Adjustment', clearableValue: false },
  { value: 'blended_rate', key: 'metrics', label: 'Rate (Blended)', clearableValue: false },
  { value: 'unblended_rate', key: 'metrics', label: 'Rate (Unblended)', clearableValue: false },
  { value: 'bytes_transferred', key: 'metrics', label: 'Data Transfer (gb)', clearableValue: false },
  { value: 'byte_hours', key: 'metrics', label: 'GB Hours', clearableValue: false },
  { value: 'gb_months', key: 'metrics', label: 'GB Months', clearableValue: false },
  { value: 'io_requests', key: 'metrics', label: 'I/O Requests', clearableValue: false },
  { value: 'on_demand_hours', key: 'metrics', label: 'On Demand Hours', clearableValue: false },
  { value: 'requests', key: 'metrics', label: 'Requests', clearableValue: false },
  { value: 'reserved_utilization_rate', key: 'metrics', label: 'Reserved Coverage Rate', clearableValue: false },
  { value: 'reserved_hours', key: 'metrics', label: 'Reserved Hours', clearableValue: false },
  { value: 'resource_identifier_count', key: 'metrics', label: 'Resource Count', clearableValue: false },
  { value: 'usage_hours', key: 'metrics', label: 'Usage Hours', clearableValue: false },
  { value: 'usage_quantity', key: 'metrics', label: 'Usage Quantity', clearableValue: false },				          
]


export const utilMetrics = [
  { value: 'avg_cpu_utilization', key: 'metrics', label: 'CPU Utilization (Avg)', clearableValue: false },
  { value: 'inbound_bandwidth', key: 'metrics', label: 'Bandwith In', clearableValue: false },
  { value: 'outbound_bandwidth', key: 'metrics', label: 'Bandwith Out', clearableValue: false },
  { value: 'max_cpu_utilization', key: 'metrics', label: 'CPU Utilization (Max)', clearableValue: false },
  { value: 'avg_cpu_utilization', key: 'metrics', label: 'CPU Utilization (Avg)', clearableValue: false },
  { value: 'max_memory_utilization', key: 'metrics', label: 'Memory Utilization (Max)', clearableValue: false },
  { value: 'avg_memory_utilization', key: 'metrics', label: 'Memory Utilization (Avg)', clearableValue: false },
  { value: 'avg_running_instances_per_hour', key: 'metrics', label: 'Avg Running Instances Per Hour', clearableValue: false },
  { value: 'total_disk_bytes', key: 'metrics', label: 'Disk Access', clearableValue: false },	
  { value: 'avg_running_instances_per_hour', key: 'metrics', label: 'Avg Running Instances Per Hour', clearableValue: false },
  { value: 'total_disk_bytes', key: 'metrics', label: 'Disk Access', clearableValue: false }, 
  { value: 'total_disk_ops', key: 'metrics', label: 'Disk I/O', clearableValue: false },
  { value: 'disk_read_bytes', key: 'metrics', label: 'Disk Read Access', clearableValue: false }, 
  { value: 'disk_read_ops', key: 'metrics', label: 'Disk Read I/O', clearableValue: false },
  { value: 'disk_write_bytes', key: 'metrics', label: 'Disk Write Access', clearableValue: false }, 
  { value: 'disk_write_ops', key: 'metrics', label: 'Disk Write I/O', clearableValue: false },
  { value: 'provisioned_read_capacity', key: 'metrics', label: 'Provisioned Read', clearableValue: false }, 
  { value: 'provisioned_write_capacity', key: 'metrics', label: 'Provisioned Write', clearableValue: false },
  { value: 'total_bandwidth', key: 'metrics', label: 'Total Bandwidth', clearableValue: false }, 
  { value: 'running_instances', key: 'metrics', label: 'Unique Instance Count', clearableValue: false },
  { value: 'utilization_hours', key: 'metrics', label: 'Utilization Hours', clearableValue: false },  				          
]